import isPlainObject from './isPlainObject';
import isFunction from './isFunction';
import getPropSelector from './getPropSelector';
import defaultSelector from './defaultSelector';
import assign from './assign';

export default function applyFactory(state, factory, selector = defaultSelector) {
  if (isFunction(factory)) {
    return factory(state);
  } else if (isPlainObject(factory)) {
    const keys = Object.keys(factory);
    return keys.length > 0 ? keys.reduce((nextState, propKey) => assign(
      nextState,
      {
        [propKey]: applyFactory(state, factory[propKey], getPropSelector(selector, propKey)),
      },
    ), selector(state)) : {};
  }
  // Probably factory is not a factory
  return factory;
}
