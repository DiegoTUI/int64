
'use strict';

const assert = require('assert');
const BigNumber = require('bignumber.js');

const numbers = require('./numbers');

const n1 = new BigNumber(numbers.number1);
const n2 = new BigNumber(numbers.number2);
const n3 = new BigNumber(numbers.number3);
const n4 = new BigNumber(numbers.number4);
const n5 = new BigNumber(numbers.number5);
const n6 = new BigNumber(numbers.number6);
const n7 = new BigNumber(numbers.number7);
const n8 = new BigNumber(numbers.number8);
const n9 = new BigNumber(numbers.number9);
const n10 = new BigNumber(numbers.number10);

// test performance of bignumber lib
console.time('bignumber lib');

console.time('bignumber lib sum');
for (let i = 0; i < numbers.NUM_ITERATIONS; i++) {
    assert.equal(n1.plus(n2).toString(), numbers.number1plus2, 'n1 + n2 failed');
    assert.equal(n1.plus(n3).toString(), numbers.number1plus3, 'n1 + n3 failed');
    assert.equal(n1.plus(n4).toString(), numbers.number1plus4, 'n1 + n4 failed');
}
console.timeEnd('bignumber lib sum');

console.time('bignumber lib mul');
for (let i = 0; i < numbers.NUM_ITERATIONS; i++) {
    assert.equal(n5.times(n8).toString(), numbers.number5times8);
    assert.equal(n6.times(n9).toString(), numbers.number6times9);
    assert.equal(n7.times(n10).toString(), numbers.number7times10);
}
console.timeEnd('bignumber lib mul');

console.timeEnd('bignumber lib');