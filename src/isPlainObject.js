export default function isPlainObject(likeObject) {
  return typeof likeObject === 'object' && likeObject.constructor === Object;
}
