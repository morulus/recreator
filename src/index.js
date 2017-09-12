import isArray from './isArray';
import isFunction from './isFunction';
import isPlainObject from './isPlainObject';
import imposeAssembler from './impose';

function toArray(a) {
  return isArray(a) ? a : [a];
}

function createRecreator(seed = [], assembler = imposeAssembler) {
  return function seeder(factories) {
    if (arguments.length === 0) {
      if (seed.length === 0) {
        throw new TypeError('Recreator requires at least one factory');
      } else {
        return assembler(seed);
      }
    }
    const nextSeed = seed
      .concat(toArray(factories));
    const resortedSeed = nextSeed.filter(isPlainObject)
      .concat(nextSeed.filter(isFunction));
    return createRecreator(
      resortedSeed,
      assembler,
    );
  };
}

const recreator = createRecreator(undefined, imposeAssembler);

recreator.createRecreator = createRecreator;

export default recreator;
