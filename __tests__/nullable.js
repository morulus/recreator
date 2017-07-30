import recreator from '../src';

describe('Build nullable factory', () => {
  it('Bug representation', () => {
    recreator({
      someData: {
        someValue: null,
      },
    })();
  });
});
