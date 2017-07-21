import { improvable } from '../src';

describe('improvable', () => {
  it('First stage must use values from second stage', () => {
    const bar = improvable({
      constants: () => ({
        name: 'Accruer',
      }),
      api: ({ constants: { name } }) => ({
        getHello() { return `Hello, ${name}`; },
      }),
    })({
      constants: () => ({
        name: 'Evolver',
      }),
    });
    const result = bar();
    expect(result.api.getHello()).toEqual('Hello, Evolver');
  });
  it('Each factory accepts previous state', () => {
    const stage1 = jest.fn(({ prop: { a } }) => {
      expect(a).toEqual(1);
      return {
        a: 2,
      };
    });
    const stage2 = jest.fn(({ prop: { a } }) => {
      expect(a).toEqual(2);
      return {
        a: 3,
      };
    });
    const bar = improvable({
      prop: () => ({
        a: 1,
      }),
    })({
      prop: stage1,
    })({
      prop: stage2,
    });
    bar();
    expect(stage1).toHaveBeenCalled();
    expect(stage2).toHaveBeenCalled();
  });
  it('Recreator stay latent without last call', () => {
    const stage1 = jest.fn(({ prop: { a } }) => {
      expect(a).toEqual(1);
      return {
        a: 2,
      };
    });
    const stage2 = jest.fn(({ prop: { a } }) => {
      expect(a).toEqual(2);
      return {
        a: 3,
      };
    });
    improvable({
      prop: () => ({
        a: 1,
      }),
    })({
      prop: stage1,
    })({
      prop: stage2,
    });
    expect(stage1).not.toHaveBeenCalled();
    expect(stage2).not.toHaveBeenCalled();
  });
});
