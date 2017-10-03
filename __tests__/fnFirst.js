import recreator from '../src';

describe('Type conflicts', () => {
  it('Pass different shape to the next factory', () => {
    const factory = recreator(() => (true));
    const model = factory();
    expect(JSON.stringify(model)).toBe('{}');
  });
  it('Pass different shape to the next factory and refactory after', () => {
    const factory = recreator(() => (true));
    const factory2 = factory({
      a: 123,
    });
    expect(factory2()).toMatchObject({
      a: 123,
    });
  });
});
