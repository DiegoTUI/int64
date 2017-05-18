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


const initGo = () => {
    go = new Go(options, () => it.next());
}

const performSumOperation = (n1, n2, expected) =>
    go.execute({n1: n1, n2: n2, op: 'sum'}, function(result, response) {
        assert.equal(response.response, expected, 'Failed sum: ' + n1 + ' + ' + n2);
        return it.next();
    });

const performDivOperation = (n1, n2, expected) =>
    go.execute({n1: n1, n2: n2, op: 'div'}, function(result, response) {;
        assert.equal(response.response, expected, 'Failed div: ' + n1 + ' / ' + n2);
        return it.next();
    });

const main = function*() {
    yield initGo()
    console.time('gonode lib');
    for(let i = 0; i < numbers.NUM_ITERATIONS; i++) {
        yield performSumOperation(numbers.number1, numbers.number2, numbers.number1plus2);
        yield performSumOperation(numbers.number1, numbers.number3, numbers.number1plus3);
        yield performSumOperation(numbers.number1, numbers.number4, numbers.number1plus4);

        yield performDivOperation(numbers.number1, numbers.number5, numbers.number1div5);
        yield performDivOperation(numbers.number1, numbers.number6, numbers.number1div6);
        yield performDivOperation(numbers.number1, numbers.number7, numbers.number1div7);
    }

    console.timeEnd('gonode lib');
    process.exit(0);
};

let it = main();
it.next();

