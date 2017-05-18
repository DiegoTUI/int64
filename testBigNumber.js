
'use strict';

const assert = require('assert');
const BigNumber = require('bignumber.js');

const numbers = require('./numbers');

// test performance of bignumber lib
console.time('bignumber lib');

for (let i = 0; i < numbers.NUM_ITERATIONS; i++) {
    const n1 = new BigNumber(numbers.number1);
    const n2 = new BigNumber(numbers.number2);
    const n3 = new BigNumber(numbers.number3);
    const n4 = new BigNumber(numbers.number4);
    const n5 = new BigNumber(numbers.number5);
    const n6 = new BigNumber(numbers.number6);
    const n7 = new BigNumber(numbers.number7);

    assert.equal(n1.plus(n2).toString(), numbers.number1plus2, 'n1 + n2 failed');
    assert.equal(n1.plus(n3).toString(), numbers.number1plus3, 'n1 + n3 failed');
    assert.equal(n1.plus(n4).toString(), numbers.number1plus4, 'n1 + n4 failed');
    
    assert.equal(n1.dividedBy(n5).floor().toString(), numbers.number1div5, 'n1 / n5 failed');
    assert.equal(n1.dividedBy(n6).floor().toString(), numbers.number1div6, 'n1 / n6 failed');
    assert.equal(n1.dividedBy(n7).floor().toString(), numbers.number1div7, 'n1 / n7 failed');
}
console.timeEnd('bignumber lib')