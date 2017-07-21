import isArray from './isArray';
import accrueAssembler from './assemblers/accrue';
import evolveAssembler from './assemblers/evolve';

function toArray(a) {
  return isArray(a) ? a : [a];
}

export function createRecreator(seed = [], assembler = accrueAssembler) {
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

export const modifiable = createRecreator(undefined, accrueAssembler);
export const improvable = createRecreator(undefined, evolveAssembler);
export default createRecreator();
