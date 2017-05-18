'use strict';

const net = require('net');
const numbers = require('./numbers');
const assert = require('assert');

let expectedResult;

const performSumOperation = (n1, n2, expected) => {
    expectedResult = expected;
    return client.write(n1 + '|' + n2 + '|sum');
}
    

const performDivOperation = (n1, n2, expected) => {
    expectedResult = expected;
    return client.write(n1 + '|' + n2 + '|div');
}

const main = function*() {
    console.time('gosocket');
    for(let i = 0; i < numbers.NUM_ITERATIONS; i++) {
        yield performSumOperation(numbers.number1, numbers.number2, numbers.number1plus2);
        yield performSumOperation(numbers.number1, numbers.number3, numbers.number1plus3);
        yield performSumOperation(numbers.number1, numbers.number4, numbers.number1plus4);

        yield performDivOperation(numbers.number1, numbers.number5, numbers.number1div5);
        yield performDivOperation(numbers.number1, numbers.number6, numbers.number1div6);
        yield performDivOperation(numbers.number1, numbers.number7, numbers.number1div7);
    }

    console.timeEnd('gosocket');
    process.exit(0);
};

const it = main();
const client = net.createConnection("/tmp/int64.sock");

client.on("connect", () => {
    return it.next();
});

client.on("data", data => {
    assert.equal(data, expectedResult, 'Failed operation: ' + data + ' - ' + expectedResult);
    return it.next();
});
