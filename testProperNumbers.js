'use strict';

const assert = require('assert');
const numbers = require('./numbers');

assert.equal(numbers.propernumber1 + numbers.propernumber2, numbers.propernumber1plus2);
assert.equal(numbers.propernumber1 + numbers.propernumber3, numbers.propernumber1plus3);
assert.equal(numbers.propernumber1 + numbers.propernumber4, numbers.propernumber1plus4);

console.time('native sum');

for (let i = 0; i < numbers.NUM_ITERATIONS; i++) {
    numbers.propernumber1 + numbers.propernumber2;
    numbers.propernumber1 + numbers.propernumber3;
    numbers.propernumber1 + numbers.propernumber4;
}

console.timeEnd('native sum');