'use strict';

const Go = require('gonode').Go;
const assert = require('assert');

const numbers = require('./numbers');

const async = require('asyncawait/async');
const await = require('asyncawait/await');
 
const options = {
    path		: 'gonode.go',
    initAtOnce	: true,	
}

let go;


const initGo = () => new Promise(resolve => {
    go = new Go(options, resolve);
});

const performSumOperation = (n1, n2, expected) => new Promise(resolve => {
    go.execute({n1: n1, n2: n2, op: 'sum'}, function(result, response) {;
        assert.equal(response.response, expected, 'Failed sum: ' + n1 + ' + ' + n2);
        return resolve();
    });
});

const performDivOperation = (n1, n2, expected) => new Promise(resolve => {
    go.execute({n1: n1, n2: n2, op: 'div'}, function(result, response) {;
        assert.equal(response.response, expected, 'Failed div: ' + n1 + ' / ' + n2);
        return resolve();
    });
});

const main = async(function() {
    await(initGo())
    for(let i = 0; i < numbers.NUM_ITERATIONS; i++) {
        await(performSumOperation(numbers.number1, numbers.number2, numbers.number1plus2));
        await(performSumOperation(numbers.number1, numbers.number3, numbers.number1plus3));
        await(performSumOperation(numbers.number1, numbers.number4, numbers.number1plus4));

        await(performDivOperation(numbers.number1, numbers.number5, numbers.number1div5));
        await(performDivOperation(numbers.number1, numbers.number6, numbers.number1div6));
        await(performDivOperation(numbers.number1, numbers.number7, numbers.number1div7));
    }
});

console.time('gonode lib');
main()
    .then(() => console.timeEnd('gonode lib'))
    .then(() => process.exit(0));
