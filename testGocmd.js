'use strict';

const exec = require('child_process').exec;
const assert = require('assert');

const numbers = require('./numbers');

const async = require('asyncawait/async');
const await = require('asyncawait/await');


const performSumOperation = (n1, n2, expected) => new Promise(resolve => {
    exec('./gocmd' + ' -n1 ' + n1 + ' -n2 ' + n2, (error, result) => {
        assert.equal(result, expected, 'Failed sum: ' + n1 + ' + ' + n2);
        return resolve();
    });
});

const performDivOperation = (n1, n2, expected) => new Promise(resolve => {
    exec('./gocmd' + ' -n1 ' + n1 + ' -n2 ' + n2 + ' -op div', (error, result) => {;
        assert(Math.abs(parseFloat(result) - expected) < numbers.TOLERANCE, 'Failed div: ' + n1 + ' + ' + n2);
        return resolve();
    });
});

const main = async(function() {
    for(let i = 0; i < numbers.NUM_ITERATIONS; i++) {
        await(performSumOperation(numbers.number1, numbers.number2, numbers.number1plus2));
        await(performSumOperation(numbers.number1, numbers.number3, numbers.number1plus3));
        await(performSumOperation(numbers.number1, numbers.number4, numbers.number1plus4));

        await(performDivOperation(numbers.number1, numbers.number2, numbers.number1div2));
        await(performDivOperation(numbers.number1, numbers.number3, numbers.number1div3));
        await(performDivOperation(numbers.number1, numbers.number4, numbers.number1div4));
    }
});

console.time('gocmd');
main()
    .then(() => console.timeEnd('gocmd'))
    .then(() => process.exit(0));
