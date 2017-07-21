import { improvable } from '../src';

const bar = improvable({
  constants: () => ({
    name: 'Accruer',
  }),
  factories: ({ constants: { name } }) => ({
    getHello() { return `Hello, ${name}`; },
  }),
})({
  constants: () => ({
    name: 'Evolver',
  }),
});

console.log(bar().factories.getHello());
