import isArray from './isArray';
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
    return createRecreator(seed.concat(toArray(factories)), assembler);
  };
}

const recreator = createRecreator(undefined, imposeAssembler);

recreator.createRecreator = createRecreator;

export default recreator;
