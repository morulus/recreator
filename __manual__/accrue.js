import { modifiable } from '../src';

const bar = modifiable({
  first: () => ({
    a: 1,
    b: 2,
    c: 3,
  }),
  second: () => ({
    a: 1,
    b: 2,
  }),
})({
  first: ({ first }) => ({
    ...first,
    z: 4,
  }),
});

console.log(bar());
