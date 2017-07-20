import isArray from './isArray';
import isFunction from './isFunction';
import isPlainObject from './isPlainObject';
import assign from './assign';

function toArray(a) {
  return isArray(a) ? a : [a];
}

function applyFactory(state, factory) {
  if (isFunction(factory)) {
    return factory(state);
  } else if (isPlainObject(factory)) {
    return Object.keys(factory)
      .reduce((nextState, propKey) => assign(
        nextState,
        {
          [propKey]: applyFactory(nextState, factory[propKey], nextState[propKey]),
        },
      ), state);
  }
  // Probably factory is not a factory
  return factory;
}

export function assembler(stock) {
  return stock.reduce((state, factory) => applyFactory(state, factory), {});
}

export function createRecreator(stock = [], builder = assembler) {
  return function creator(factories) {
    if (arguments.length === 0) {
      if (stock.length === 0) {
        throw new TypeError('Recreator requires at least one factory');
      } else {
        return builder(stock);
      }
    }
    return createRecreator(stock.concat(toArray(factories)), builder);
  };
}

export default createRecreator();
