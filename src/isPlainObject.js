export default function isPlainObject(likeObject) {
  return typeof likeObject === 'object' && likeObject !== null && likeObject.constructor === Object;
}
