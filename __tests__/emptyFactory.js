import recreator from '../src';

describe('Empty factory', () => {
  it('Call empty factory without arguments', () => {
    expect(JSON.stringify(recreator())).toBe('{}');
  });
  it('Call empty factory with undefined', () => {
    expect(
      () => recreator(undefined),
    ).toThrow('Fabric passed to the factory must be plain object or a function');
  });
  it('Call empty factory with null', () => {
    expect(
      () => recreator(null),
    ).toThrow('Fabric passed to the factory must be plain object or a function');
  });
  it('Call empty factory with number', () => {
    expect(
      () => recreator(1),
    ).toThrow('Fabric passed to the factory must be plain object or a function');
  });
  it('Call empty factory with date', () => {
    expect(
      () => recreator(new Date()),
    ).toThrow('Fabric passed to the factory must be plain object or a function');
  });
  it('Call empty factory with Object', () => {
    expect(
      JSON.stringify(recreator(Object)()),
    ).toBe('{}');
  });
});
