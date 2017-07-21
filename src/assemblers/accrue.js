import applyFactory from '../applyFactory';

export default function accrueAssembler(stock) {
  const state = {};
  stock.forEach(factory => applyFactory(state, factory));
  return state;
}
