import applyFactory from '../applyFactory';
import isPlainObject from '../isPlainObject';
import getPropSelector from '../getPropSelector';
import defaultSelector from '../defaultSelector';

function ensureObject(some) {
  return isPlainObject(some) ? some : {};
}

/* eslint-disable no-plusplus */
/* Sorry for imperative style, the goal is performance */
export default function evolveAssembler(stock) {
  const allProps = [];
  for (let index = 0; index < stock.length; index++) {
    if (isPlainObject(stock[index])) {
      const props = Object.keys(stock[index]);
      for (let propIndex = 0; propIndex < props.length; propIndex++) {
        if (!allProps.includes(props[propIndex])) {
          allProps.push(props[propIndex]);
        }
      }
    } else {
      throw new TypeError('evolving with function');
    }
  }
  const state = {};
  for (let propIndex = 0; propIndex < allProps.length; propIndex++) {
    for (let index = 0; index < stock.length; index++) {
      if (isPlainObject(stock[index])) {
        state[allProps[propIndex]] = Object.assign(
          ensureObject(state[allProps[propIndex]]),
          applyFactory(
            state,
            stock[index][allProps[propIndex]],
            getPropSelector(defaultSelector, allProps[propIndex]),
          ),
        );
      }
    }
  }
  return state;
}
/* eslint-enable */
