'use strict';

const assert = require('assert');
const numbers = require('./numbers');
const Int64 = require('./int64exp');

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
//const n1pn2 = n1.plusFloat(n2);
//const n1pn3 = n1.plusFloat(n3);

//console.log(n1.sign, n1.mantissaInt, n1.mantissaDec, n1.toString(), numbers.number1)
//console.log(n2.sign, n2.mantissaInt, n2.mantissaDec, n2.toString(), numbers.number2)
//console.log(n3.sign, n3.mantissaInt, n3.mantissaDec, n3.toString(), numbers.number3)
//console.log(n4.sign, n4.mantissaInt, n4.mantissaDec, n4.toString(), numbers.number4)
//console.log(n5.sign, n5.mantissaInt, n5.mantissaDec, n5.toString(), numbers.number5)
//console.log(n6.sign, n6.mantissaInt, n6.mantissaDec, n6.toString(), numbers.number6)
//console.log(n7.sign, n7.mantissaInt, n7.mantissaDec, n7.toString(), numbers.number7)*/
//console.log(n1pn2.toString(), numbers.number1plus2)
//console.log(n1pn3.toString(), numbers.number1plus3)

// test performance of own int64 lib
console.time('own int64exp lib sum INT');

for (let i = 0; i < numbers.NUM_ITERATIONS; i++) {
    assert.equal(n1.plus(n2).toString(), numbers.number1plus2, 'n1 + n2 failed');
    assert.equal(n1.plus(n3).toString(), numbers.number1plus3, 'n1 + n3 failed');
    assert.equal(n1.plus(n4).toString(), numbers.number1plus4, 'n1 + n4 failed');
    
}
console.timeEnd('own int64exp lib sum INT');

// test performance of own int64 lib
console.time('own int64exp lib sum FLOAT');

for (let i = 0; i < numbers.NUM_ITERATIONS; i++) {
    assert.equal(n1.plusFloat(n2).toString(), numbers.number1plus2, 'n1 + n2 failed');
    assert.equal(n1.plusFloat(n3).toString(), numbers.number1plus3, 'n1 + n3 failed');
    assert.equal(n1.plusFloat(n4).toString(), numbers.number1plus4, 'n1 + n4 failed');
    
}
console.timeEnd('own int64exp lib sum FLOAT');
