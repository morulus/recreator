// Pass static values instead constructor
// Test for string values

import recreator from '../src';

const expected = {
  string: 'string',
  number: 123,
  boolean: true,
  booleanFalse: false,
  date: new Date(),
  nullable: null,
  undefinedable: undefined,
  objectable: {},
  arrayable: {},
};

function stageA() {
  return {
    string: 'string',
    number: 123,
    boolean: true,
    booleanFalse: false,
    date: new Date(),
    nullable: null,
    undefinedable: undefined,
    objectable: {},
    arrayable: {},
  };
}

describe('Test for static data', () => {
  it('All types must be assigned correctly', () => {
    const bar = recreator(stageA);
    expect(typeof bar).toBe('function');
    const result = bar();
    expect(result.string).toEqual(expected.string);
    expect(result.number).toEqual(expected.number);
    expect(result.boolean).toEqual(expected.boolean);
    expect(result.booleanFalse).toEqual(expected.booleanFalse);
    expect(typeof result.date).toEqual(typeof expected.date);
    expect(result.nullable).toEqual(expected.nullable);
    expect(result.undefinedable).toEqual(expected.undefinedable);
    expect(result.objectable).toEqual(expected.objectable);
    expect(result.arrayable).toEqual(expected.arrayable);
  });
});
