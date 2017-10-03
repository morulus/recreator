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
        return {}; // No factory. Return empty object
      }
      return assembler(seed);
    }
    const nextSeed = seed
      .concat(toArray(factories));
    const objectiveSeed = nextSeed.filter(isPlainObject);
    const functionalSeed = nextSeed.filter(isFunction);
    if (objectiveSeed.length + functionalSeed.length !== nextSeed.length) {
      throw new TypeError('Fabric passed to the factory must be plain object or a function');
    }
    const combinedSeed = objectiveSeed.concat(functionalSeed);
    return createRecreator(
      combinedSeed,
      assembler,
    );
  };
}

const recreator = createRecreator(undefined, imposeAssembler);

recreator.createRecreator = createRecreator;

export default recreator;
