import recreator from '../src';

function CustomObjectClass() {
  this.someData = 12;
}

describe('Plain object', () => {
  it('Any object passed to the factory must be plain', () => {
    expect(() => {
      recreator(new CustomObjectClass())();
    }).toThrow('Fabric passed to the factory must be plain object or a function');
  });
  it('Any nested object passed to the factory must be plain', () => {
    expect(() => {
      recreator({
        abc: new CustomObjectClass(),
      })();
    }).toThrow('Nested structure with non plain object at <factory>.abc');
  });
});
