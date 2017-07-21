import isPlainObject from './isPlainObject';

export default function getPropSelector(selector, propKey) {
  return (state, injection) => {
    const property = selector(state);
    if (!isPlainObject(property[propKey])) {
      property[propKey] = {};
    }
    if (injection) {
      property[propKey] = injection;
    }
    return property[propKey];
  };
}
