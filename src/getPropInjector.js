import isPlainObject from './isPlainObject';

export default function getPropSelector(selector, propKey) {
  return (state) => {
    const property = selector(state);
    return isPlainObject(property) ? (property[propKey] || {}) : {};
  };
}
