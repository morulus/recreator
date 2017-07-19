const EMPTY_OBJECT = {};

/* eslint-disable no-nested-ternary */
function createIfFn(arg) {
  return fn => (typeof fn === 'object'
    ? fn : (typeof fn === 'function' ? fn(arg) : {}));
}
/* eslint-enable */

function create(creators, arg) {
  return Object.assign({}, ...creators.map(createIfFn(arg)));
}

function reject(keys) {
  return key => !keys.includes(key);
}

export default function recreator(defaults = {}) {
  return function creator(custom) {
    if (arguments.length === 0) {
      return defaults;
    }
    const cookedKeys = [];
    const domain = Object.keys(defaults).reduce((nextDomain, creatorKey) => {
      const payload = create([defaults[creatorKey], custom[creatorKey]], nextDomain);
      cookedKeys.push(creatorKey);
      return {
        ...nextDomain,
        [creatorKey]: payload,
      };
    }, EMPTY_OBJECT);
    const left = Object.keys(custom).filter(reject(cookedKeys));
    return recreator(left.reduce((nextDomain, creatorKey) => {
      const payload = create([custom[creatorKey]], nextDomain);
      return {
        ...nextDomain,
        [creatorKey]: payload,
      };
    }, domain));
  };
}
