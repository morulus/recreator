/* eslint no-plusplus: 0, no-param-reassign: 0, no-continue: 0 */
import isPlainObject from './isPlainObject';
import isFunction from './isFunction';

const BAILOUT = Symbol('BAILOUT');

function inject(state, path, data = {}) {
  if (path.length === 0) {
    Object.assign(state, data);
  } else {
    if (data !== null && typeof data === 'object' && !isPlainObject(data)) {
      throw TypeError(`Nested structure with non plain object at <factory>.${path}`);
    }
    let target = state;
    for (let i = 0; i < path.length - 1; i++) {
      if (!isPlainObject(target[path[i]])) {
        target[path[i]] = {};
      }
      target = target[path[i]];
    }
    if (isPlainObject(data) && (target[path[path.length - 1]])) {
      Object.assign(target[path[path.length - 1]], data);
    } else {
      target[path[path.length - 1]] = data;
    }
  }
}

function threadDeep(object, path) {
  if (path.length === 0) {
    return object;
  }
  // Unreachable block. There is no cases when this conditional block executes
  // But addditional QA test requires
  // if (!isPlainObject(object)) {
  //   return BAILOUT;
  // }
  let current = object;
  for (let i = 0; i < path.length - 1; i++) {
    if (!isPlainObject(current[path[i]])) {
      return BAILOUT;
    }
    current = current[path[i]];
  }
  return current[path[path.length - 1]];
}

function addworkedOutPath(index, workedOut, path) {
  if (!workedOut[index]) {
    workedOut[index] = {};
  }
  let target = workedOut[index];
  for (let i = 0; i < path.length; i++) {
    if (!isPlainObject(target[path[i]])) {
      target[path[i]] = {};
    }
    target = target[path[i]];
  }
}

function isInWorkedOut(index, workedOut, path) {
  if (path.length === 0) return false;
  let target = workedOut[index] || {};
  for (let i = 0; i < path.length; i++) {
    if (!isPlainObject(target[path[i]])) {
      return false;
    }
    target = target[path[i]];
  }
  return true;
}

function walk(objects, startIndex, workedOut, handler, path = [], payload = {}) {
  function getRewalk(currentIndex) {
    return (nextKey) => {
      walk(objects, currentIndex, workedOut, handler, path.concat([nextKey]), payload);
    };
  }
  for (let index = startIndex; index < objects.length; index++) {
    if (isInWorkedOut(index, workedOut, path)) {
      continue;
    }
    const regular = threadDeep(objects[index], path);
    // if (regular !== BAILOUT) {
    addworkedOutPath(index, workedOut, path);
    handler(regular, path, getRewalk(index), payload);
    // }
  }
}

function transfix(handler) {
  return function batcher(objects, payload) {
    const workedOut = [];
    walk(objects, 0, workedOut, handler, [], payload);
  };
}

export default transfix((regular, path, rewalk, payload) => {
  if (isFunction(regular)) {
    // Eval factory
    const result = regular(payload.state);
    inject(payload.state, path, result);
  } else if (isPlainObject(regular)) {
    const keys = Object.keys(regular);
    for (let index = 0; index < keys.length; index++) {
      const nextPath = path.concat([keys[index]]);
      inject(payload.state, nextPath);
      rewalk(keys[index]);
    }
  } else {
    inject(payload.state, path, regular);
  }
});
