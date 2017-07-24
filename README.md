recreator
==

Magic object factory where each next property can be calculated based on previously defined properties or their future modifications.

Mechanic
----

Simple example:
```js
const bar = recreator({
  a: 1,
  b: ({ a }) => a + 1,
  c: ({ b }) => b + 1,
}); // : function

const foo = bar();
foo.c; // 3

// This is not the end
// Let modif some part of `bar`

const bar2 = bar({
  a: 2,
});

const foo2 = bar2();
foo2.c; // 4

```

One more example:

```js
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
  say: ({ getText }) => () => console.log(getText()),
})();

helloVova.getText(); // Hello, Vova
helloSveta.getText(); // Hello, Sveta
helloAnya.getText(); // Hello, Anya
helloWorld.say();
// console: Hello, World

```

Author
----

Vladimir Kalmykov <vladimirmorulus@gmail.com>

License
----

MIT, 2017
