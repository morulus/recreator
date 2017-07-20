import { evolve } from '../src';

function stageA() {
  return {
    alfa: 1,
    beta: 2,
    omega: 3,
    opra: -1,
  };
}

function stageB({ alfa, beta, omega }) {
  return {
    alfa: alfa + 1,
    beta: beta + 2,
    omega: omega + 3,
    zetta: 0,
  };
}

describe('recreator evolve with common factores', () => {
  it('Evolver, called with object, must return function', () => {
    const bar = evolve(stageA);
    expect(typeof bar).toBe('function');
    const bar2 = bar(stageB);
    expect(typeof bar2).toBe('function');
    const result = bar2();
    expect(result.alfa).toEqual(2);
    expect(result.beta).toEqual(4);
    expect(result.omega).toEqual(6);
    expect(result.zetta).toEqual(0);
    expect(result.opra).toEqual(undefined);
  });
});
