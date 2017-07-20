import isPlainObject from './isPlainObject';
import isArray from './isArray';

function getTypeErrorMessage(expectedType, givenType) {
  return `Unasignable factory result of type ${givenType}, ${expectedType} extected`;
}

export default function assign(current, next) {
  if (!next) {
    return current;
  }
  if (isPlainObject(current)) {
    if (!isPlainObject(next)) {
      throw new TypeError(getTypeErrorMessage('plain object', typeof next));
    }
    return Object.assign(current, next);
  } else if (isArray(current)) {
    if (!isArray(next)) {
      throw new TypeError(getTypeErrorMessage('array', typeof next));
    }
    return current.concat(isArray(next) ? next : [next]);
  }
  return next;
}
