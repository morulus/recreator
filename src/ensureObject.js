import isPlainObject from './isPlainObject';

export default function ensureObject(some) {
  return isPlainObject(some) ? some : {};
}
