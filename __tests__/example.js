import recreator from '../src';

describe('Test example code', () => {
  it('Fn must say hello for each subject', () => {
    const helloSayer = recreator({
      name: 'Anonym',
      getText: ({ name }) => () => `Hello, ${name}`,
    });

    const helloVova = helloSayer({
      name: 'Vova',
    })();

    const helloSveta = helloSayer({
      name: 'Sveta',
    })();

    const helloAnya = helloSayer({
      name: 'Anya',
    })();

    const helloWorld = helloSayer({
      name: 'World',
      getQuotedText: ({ getText }) => () => `"${getText()}"`,
    })();

    expect(helloVova.getText()).toEqual('Hello, Vova'); // Hello, Vova
    expect(helloSveta.getText()).toEqual('Hello, Sveta'); // Hello, Sveta
    expect(helloAnya.getText()).toEqual('Hello, Anya'); // Hello, Anya
    expect(helloWorld.getQuotedText()).toEqual('"Hello, World"'); // Hello, Anya
  });
});
