'use strict';

const assert = require('assert');
const Long = require('long');
const numbers = require('./numbers');

const n1 = Long.fromString(numbers.number1);
const n2 = Long.fromString(numbers.number2);
const n3 = Long.fromString(numbers.number3);
const n4 = Long.fromString(numbers.number4);

const n1plusn2 = Long.fromString(numbers.number1plus2);
const n1plusn3 = Long.fromString(numbers.number1plus3);
const n1plusn4 = Long.fromString(numbers.number1plus4);

assert(n1.add(n2).compare(n1plusn2) === 0);
assert(n1.add(n3).compare(n1plusn3) === 0);
assert(n1.add(n4).compare(n1plusn4) === 0);

console.time('long lib sum');
for (let i = 0; i < numbers.NUM_ITERATIONS; i++) {
    n1.add(n2);
    n1.add(n3);
    n1.add(n4);
}
console.timeEnd('long lib sum');