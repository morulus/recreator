import isPlainObject from './isPlainObject';

export default function getPropSelector(selector, propKey) {
  return (state) => {
    const property = selector(state);
    if (!isPlainObject(property[propKey])) {
      property[propKey] = {};
    }
    return property[propKey];
  };
}
