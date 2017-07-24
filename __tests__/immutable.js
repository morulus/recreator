import recreator from '../src';

describe('Immutability', () => {
  it('Improvable is immutable', () => {
    const bar = recreator({
      constants: () => ({
        name: 'Accruer',
      }),
      api: ({ constants: { name } }) => ({
        getHello() { return `Hello, ${name}`; },
      }),
    });
    const barA = bar({
      constants: () => ({
        name: 'Bar-A',
      }),
    });
    const barB = bar({
      constants: () => ({
        name: 'Bar-B',
      }),
    });
    const resultA = barA();
    const resultB = barB();
    expect(resultA.api.getHello()).toEqual('Hello, Bar-A');
    expect(resultB.api.getHello()).toEqual('Hello, Bar-B');
  });
  it('Improvable is deeply immutable', () => {
    const bar = recreator({
      constants: {
        texts: () => ({
          greating: 'Hello',
          name: 'Accruer',
        }),
      },
      api: ({ constants: { texts: { name, greating } } }) => ({
        getHello() { return `${greating}, ${name}`; },
      }),
    });
    const barA = bar({
      constants: {
        texts: () => ({
          name: 'Bar-A',
        }),
      },
    });
    const barB = bar({
      constants: {
        texts: () => ({
          name: 'Bar-B',
        }),
      },
    });
    const resultA = barA();
    const resultB = barB();
    expect(resultA.api.getHello()).toEqual('Hello, Bar-A');
    expect(resultB.api.getHello()).toEqual('Hello, Bar-B');
  });
});
