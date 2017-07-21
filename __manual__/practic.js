import { improvable } from '../src';

const bar = improvable({
  helpers: () => ({
    actionNameCreator: name => `RE-${name}`,
  }),
  constants: {},
  actions: {
    names: ({ helpers: { actionNameCreator } }) => ({
      EXISTEN_ACTION: actionNameCreator('EXISTEN_ACTION'),
    }),
  },
});

console.log(bar());
