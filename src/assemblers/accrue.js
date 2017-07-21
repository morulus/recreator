import applyFactory from '../applyFactory';

export default function accrueAssembler(stock) {
  return stock.reduce((state, factory) => applyFactory(state, factory), {});
}
