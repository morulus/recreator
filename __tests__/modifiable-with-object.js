import recreator from '../src';

function createA() {
  return {
    a1: 1,
    a2: 2,
    a3: 3,
  };
}

function createB() {
  return {
    b1: 1,
    b2: 2,
    b3: 3,
  };
}

function createC() {
  return {
    c1: 1,
    c2: 2,
    c3: 3,
  };
}

function createD() {
  return {
    d1: 1,
    d2: 2,
    d3: 3,
  };
}

describe('recreator', () => {
  it('Recreator, called with object, must return function', () => {
    const bar = recreator({
      a: createA,
      b: createB,
    });
    expect(typeof bar).toBe('function');
    const bar2 = bar({
      c: createC,
    });
    expect(typeof bar2).toBe('function');
    const bar3 = bar({
      d: createD,
    });
    expect(typeof bar3).toBe('function');
  });
  it('Recreator, called with no arguments, must returns object', () => {
    const bar = recreator({
      a: createA,
      b: createB,
    });
    const result = bar();
    expect(typeof result).toBe('object');
  });
  it('Recreator must merge all creators results', () => {
    const result = recreator({
      a: createA,
    })({
      b: createB,
    })({
      c: createC,
    })({
      d: createD,
    })();

    const manualResult = {
      a: createA(),
      b: createB(),
      c: createC(),
      d: createD(),
    };
    expect(JSON.stringify(result)).toBe(JSON.stringify(manualResult));
  });
});
