'use strict';

const assert = require('assert');
const numbers = require('./numbers');
const Int64 = require('./int64');

const n1Int64 = new Int64(numbers.number1);
const n3Int64 = new Int64(numbers.number3);
const fifteen = new Int64('15');
const minusfive = new Int64('-5');


const n1 = new Int64(numbers.number1);
const n2 = new Int64(numbers.number2);
const n3 = new Int64(numbers.number3);
const n4 = new Int64(numbers.number4);
const n5 = new Int64(numbers.number5);
const n6 = new Int64(numbers.number6);
const n7 = new Int64(numbers.number7);

// test performance of own int64 lib
console.time('own int64 lib');

for (let i = 0; i < numbers.NUM_ITERATIONS; i++) {
    assert.equal(n1.plus(n2).toString(), numbers.number1plus2, 'n1 + n2 failed');
    assert.equal(n1.plus(n3).toString(), numbers.number1plus3, 'n1 + n3 failed');
    assert.equal(n1.plus(n4).toString(), numbers.number1plus4, 'n1 + n4 failed');
    
    //assert.equal(n1.dividedBy(n5).floor().toString(), numbers.number1div5, 'n1 / n5 failed');
    //assert.equal(n1.dividedBy(n6).floor().toString(), numbers.number1div6, 'n1 / n6 failed');
    //assert.equal(n1.dividedBy(n7).floor().toString(), numbers.number1div7, 'n1 / n7 failed');
}
console.timeEnd('own int64 lib')

