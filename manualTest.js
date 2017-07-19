const recreator = require('./lib/index.js').default;

function createA() {
  return {
    a1: 1,
    a2: 2,
    a3: 3,
  };
}

function createB() {
  return {
    b1: 1,
    b2: 2,
    b3: 3,
  };
}

function createC() {
  return {
    c1: 1,
    c2: 2,
    c3: 3,
  };
}

recreator({
  a: createA,
})({
  b: createB,
})({
  c: createC,
});
