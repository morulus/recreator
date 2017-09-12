import recreator from '../src';

function stageD({ stage }) {
  return {
    stage: `${stage}D`,
  };
}

function stageE({ stage }) {
  return {
    stage: `${stage}E`,
  };
}

const stageA = {
  stage: 'A',
};

const stageB = {
  stage: ({ stage }) => (`${stage}B`),
};

const stageC = {
  stage: ({ stage }) => (`${stage}C`),
};

describe('Order', () => {
  it('All functional stages have to be called last in adding order', () => {
    const bar = recreator(stageD)(stageA)(stageE)(stageB)(stageC);
    expect(bar().stage).toBe('ABCDE');
  });
});
