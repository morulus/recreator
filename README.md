recreator
==

An expressive way to make factory with customizable nested structure. To best understanding conceptual difference from classic factories and classes, imaginate that you work with ES modules tree with one entry point, and each module of nested hierarchy structure you can customize to get new new instance of entry point, holding immutablity of previously.

Install:
----

```shell
npm i recreator --S
```

Usage:
----

```
import recreator from 'recreator';
```

Principle
----

In a short, recreator is a composite factory. But it is not so simple.
```js
const factory = recreator({
  a: 1,
  b: ({ a }) => a * 2, // b depends on a
  c: ({ b }) => b + 2, // c depends on b
});
const factory2 = factory({
  a: 2, // cutomize the a value
});
// Build object
const model = factory2(); // {a: 2, b: 4, c: 6}
```

Each property of passed object can be a function. That function is a factory of this property's value. The value of each plain object property, which you pass to factory creator, can be the another plain object (nested structure), or a function (property-factory), or non-function value.

This kind of object factory founds very usefull for model-driven structure of the applications. You can keep all parts of you model (for example, actions, reducer, sagas, selector, etc) in one object, easily to customize it, or export as another module.

```js
import recreator from 'recreator';

const factory = recreator({
  name: 'DEFAULT',
  helpers: {
    createActionName: ({
      name,
    }) => (suffix) => `${name}_${suffix}`,
  },
  actions: {
    names: ({
      helpers: {
        createActionName,
      }
    }) => ({
      FETCH: createActionName('FETCH'),
    }),
    creators: ({
      actions: {
        names: {
          FETCH,
        }
      },
    }) => ({
      fetch: (id) => ({
        type: FETCH,
        id,
      })
    }),
  },

});
```

In this example, I defines `name` of the model, and then creates helpers, which uses the name of the model (defined previously), and then I creates the action names, which uses this helpers, and action creators, which uses action names and helpers.

Important behaviors of property-factory become order of definition. Each next property access previously.

```
{
  A: () => {}, <--\ Previous factory knows nothing about next property
  B, ({ A }) => {} >--/ Next property can use the values of previous properties
}
```

Thus, you can create next property value on the basis of previously property.

```js
const factory = recreator({
  a: 1,
  b: ({ a }) => a * 2, // b depends on a
  c: ({ b }) => b + 2, // c depends on b
});
```

The main goal is customization. After a factory had created, you can customize any part of it by calling factory with another object, which (fully or partially) repeats the form of previous pattern, but contains new values.

```js
const factory2 = factory({
  a: 2, // cutomize the a value
});
```

You can do it many times.

```js
const factory3 = factory2({
  b: ({ a }) => (a * 3),
})

const factory4 = factory2({
  b: ({ a }) => (a / 2),
})
```

Each factory's calling with object passing, creates new immutable factory. Each layer you may add do not just overlap previous value as `Object.assign`. Algorithm extends through the each values as through the tracing-paper. I means that each next property accepts results of previous property, which created using last micro-factory.

Nested structures behave the same way. You can define a nested object and its properties with factories, which will create its object, tracing all layers in the same depth level.

```js
const helloSpeaker = recreator({
  config: {
    lang: 'eng',
  },
  texts: {
    eng: {
      greeting: 'Hello',
    },
    rus: {
      greeting: 'Привет',
    }
  },
  api: {
    sayHello: ({
      config: {
        lang,
      },
      texts,
    }) => (name) => `${texts[lang].greeting}, ${name}`,
  }
});

// Build with default lang value
const engSpeaker = helloSpeaker();
// Customize and build with another lang value
const rusSpeaker = helloSpeaker({
  config: {
    lang: 'rus',
  }
})();
engSpeaker.sayHello('Vova'); // Hello, Vova
rusSpeaker.satHello('Vova'); // Привет, Vova
```

Builded object is immutable and decomposable. Post mutable changes do not affect its functions result.

```js
engSpeaker.config.lang = 'rus';
// Expects `Привет` instead of `Hello`
// But lang is still english
engSpeaker.sayHello('Sveta'); // Hello, Sveta
```
But a decomposed function still bound to the values, which depends on.

```js
const { sayHello } = engSpeaker;
sayHello('Anya'); // Hello, Anya
```

The factory can produce two types of products - another factory or final object. To create another factory you should call existen factory with plain object (_or a function - See post transformers_). To run factory just call the factory with no arguments.

```js
// Initial factory
const factory = recreator({
  log: () => console.log,
})

// Recreate factory
const factory2 = factory({
  warn: () => console.warn,
});

// Recreate factory with post-transformer
const factory3 = factory2((data) => {
  return data;
});

// Build object
const logger = factory3();

// Build another object
const logger2 = factory3();
```


You can recreate factories on the basis of other factories an unlimited number of times by feeding factory new values.

Post-transformers
----

You can pass to the factory a function. This function accepts resultative object. Yes. The function passed to factory will be called when all property-factories will be completely done. You can use this fact to perform free transformation or final object validation.

```js
const factory = recreator({
  api: {
    enhance: () => {...},
  },
})((data) => {
  warning(typeof data === 'function', 'api.enhance must be a function'),
});
```

Coverage
-----

File              |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
------------------|----------|----------|----------|----------|----------------|
All files         |      100 |    91.84 |      100 |      100 |                |
 applyFactory.js  |      100 |    94.12 |      100 |      100 |             74 |
 impose.js        |      100 |      100 |      100 |      100 |                |
 index.js         |      100 |       80 |      100 |      100 |           7,10 |
 isArray.js       |      100 |      100 |      100 |      100 |                |
 isFunction.js    |      100 |      100 |      100 |      100 |                |
 isPlainObject.js |      100 |      100 |      100 |      100 |                |

Author
----

Vladimir Kalmykov <vladimirmorulus@gmail.com>

License
----

MIT, 2017
