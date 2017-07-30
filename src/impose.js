import applyFactory from './applyFactory';

/* eslint-disable no-plusplus */
/* Sorry for imperative style, the goal is performance */
export default function imposeAssembler(stock) {
  const state = {};
  applyFactory(
    stock,
    {
      state,
    },
  );
  return state;
}
/* eslint-enable */
