import isPlainObject from './isPlainObject';
import isFunction from './isFunction';
import getPropSelector from './getPropSelector';
import defaultSelector from './defaultSelector';

export default function applyFactory(state, factory, selector = defaultSelector) {
  const localState = selector(state);
  if (isFunction(factory)) {
    const result = factory(state);
    if (isPlainObject(result)) {
      return Object.assign(localState, factory(state));
    }
    selector(state, result);
  } else if (isPlainObject(factory)) {
    const keys = Object.keys(factory);
    keys.forEach((propKey) => {
      const nextData = applyFactory(
        state,
        factory[propKey],
        getPropSelector(selector, propKey),
      );
      Object.assign(localState[propKey], nextData);
    });
  }
  // Probably factory is not a factory
  return factory;
}
