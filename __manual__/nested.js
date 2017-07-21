import { improvable } from '../src';

const bar = improvable({
  first: {
    s: 11,
    a: () => ({
      q: 1,
      r: 2,
      s: 3,
    }),
  },
})({
  first: prevState => ({
    a: {
      z: prevState.first.a.q,
    },
  }),
});

console.log(bar());
