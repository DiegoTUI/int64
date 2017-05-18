'use strict';

const fs = require('fs');
const assert = require('assert');
const buf = fs.readFileSync('./addTwoInt64.wasm');
const Int64 = require("int64-buffer").Int64LE
const numbers = require('./numbers');

const memory = new WebAssembly.Memory({initial:1});

const n1Int64 = new Int64(numbers.number1, 10);
const n2Int64 = new Int64(numbers.number2, 10);
const n3Int64 = new Int64(numbers.number3, 10);
const n4Int64 = new Int64(numbers.number4, 10);
const n5Int64 = new Int64(numbers.number5, 10);
const n6Int64 = new Int64(numbers.number6, 10);
const n7Int64 = new Int64(numbers.number7, 10);

let waspInstance;
const waspInstanceMemoryUint32 = new Uint32Array(memory.buffer);

const performSumOperation = (n1, n2, expected) => {
    waspInstanceMemoryUint32[0] = n1.toBuffer().readUInt32LE(0);
    waspInstanceMemoryUint32[1] = n1.toBuffer().readUInt32LE(4);
    waspInstanceMemoryUint32[2] = n2.toBuffer().readUInt32LE(0);
    waspInstanceMemoryUint32[3] = n2.toBuffer().readUInt32LE(4);
    waspInstance.exports.addTwo();
    assert.equal(new Int64(waspInstanceMemoryUint32.buffer, 16).toString(), expected,
                            'Failed sum operation - ' + n1.toString() + '-' +
                                                        n2.toString() + '-' +
                                                        expected);
}
    

const performDivOperation = (n1, n2, expected) => {
    waspInstanceMemoryUint32[0] = n1.toBuffer().readUInt32LE(0);
    waspInstanceMemoryUint32[1] = n1.toBuffer().readUInt32LE(4);
    waspInstanceMemoryUint32[2] = n2.toBuffer().readUInt32LE(0);
    waspInstanceMemoryUint32[3] = n2.toBuffer().readUInt32LE(4);
    waspInstance.exports.divTwo();
    assert.equal(new Int64(waspInstanceMemoryUint32.buffer, 16).toString(), expected,
                            'Failed div operation - ' + n1.toString() + '-' +
                                                        n2.toString() + '-' +
                                                        expected);
}

WebAssembly.compile(new Uint8Array(buf))
    .then(module => {
        const imports = {
            console: {
                log: function(arg) {
                    console.log(arg);
                }
            },
            js: {
                mem: memory
            }
        };

        return new WebAssembly.Instance(module, imports);
    })
    .then(instance => {
        waspInstance = instance;

        console.time('testWasp');
        for (let i = 0; i < 100000; i++) {
            performSumOperation(n1Int64, n2Int64, numbers.number1plus2);
            performSumOperation(n1Int64, n3Int64, numbers.number1plus3);
            performSumOperation(n1Int64, n4Int64, numbers.number1plus4);

            performDivOperation(n1Int64, n5Int64, numbers.number1div5);
            performDivOperation(n1Int64, n6Int64, numbers.number1div6);
            performDivOperation(n1Int64, n7Int64, numbers.number1div7);
        }
        console.timeEnd('testWasp');

        process.exit(0);
    })
    .catch(console.log);

