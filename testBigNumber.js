
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

    assert.equal(n1.plus(n2).toString(), numbers.number1plus2, 'n1 + n2 failed');
    assert.equal(n1.plus(n3).toString(), numbers.number1plus3, 'n1 + n3 failed');
    assert.equal(n1.plus(n4).toString(), numbers.number1plus4, 'n1 + n4 failed');
    
    assert(Math.abs(n1.dividedBy(n2).toNumber() - numbers.number1div2) < numbers.TOLERANCE, 'n1 / n2 failed');
    assert(Math.abs(n1.dividedBy(n3).toNumber() - numbers.number1div3) < numbers.TOLERANCE, 'n1 / n3 failed');
    assert(Math.abs(n1.dividedBy(n4).toNumber() - numbers.number1div4) < numbers.TOLERANCE, 'n1 / n4 failed');
}
console.timeEnd('bignumber lib')