'use strict';

const assert = require('assert');
const numbers = require('./numbers');

console.time('native sum');

for (let i = 0; i < numbers.NUM_ITERATIONS; i++) {
    assert.equal(numbers.propernumber1 + numbers.propernumber2, numbers.propernumber1plus2, 'n1 + n2 failed');
    assert.equal(numbers.propernumber1 + numbers.propernumber3, numbers.propernumber1plus3, 'n1 + n2 failed');
    assert.equal(numbers.propernumber1 + numbers.propernumber4, numbers.propernumber1plus4, 'n1 + n2 failed');
}

console.timeEnd('native sum');