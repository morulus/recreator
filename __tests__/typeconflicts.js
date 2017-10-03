import recreator from '../src';

describe('Type conflicts', () => {
  it('Pass different shape to the next factory', () => {
    const factory = recreator({
      a: 123,
    });
    const factory2 = factory({
      a: {
        b: 123,
      },
    });
    const model = factory2();
    expect(model).toMatchObject({
      a: {
        b: 123,
      },
    });
  });
});
