'use strict';

const fs = require('fs');
const assert = require('assert');
const buf = fs.readFileSync('./int64offset.wasm');
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

// Enter numbers in memory
waspInstanceMemoryUint32[0] = n1Int64.toBuffer().readUInt32LE(0);
waspInstanceMemoryUint32[1] = n1Int64.toBuffer().readUInt32LE(4);
waspInstanceMemoryUint32[2] = n2Int64.toBuffer().readUInt32LE(0);
waspInstanceMemoryUint32[3] = n2Int64.toBuffer().readUInt32LE(4);
waspInstanceMemoryUint32[4] = n3Int64.toBuffer().readUInt32LE(0);
waspInstanceMemoryUint32[5] = n3Int64.toBuffer().readUInt32LE(4);
waspInstanceMemoryUint32[6] = n4Int64.toBuffer().readUInt32LE(0);
waspInstanceMemoryUint32[7] = n4Int64.toBuffer().readUInt32LE(4);
waspInstanceMemoryUint32[8] = n5Int64.toBuffer().readUInt32LE(0);
waspInstanceMemoryUint32[9] = n5Int64.toBuffer().readUInt32LE(4);
waspInstanceMemoryUint32[10] = n6Int64.toBuffer().readUInt32LE(0);
waspInstanceMemoryUint32[11] = n6Int64.toBuffer().readUInt32LE(4);
waspInstanceMemoryUint32[12] = n7Int64.toBuffer().readUInt32LE(0);
waspInstanceMemoryUint32[13] = n7Int64.toBuffer().readUInt32LE(4);

const performSumOperation = (offset1, offset2, offsetResult, expected) => {
    waspInstance.exports.addTwo(offset1, offset2, offsetResult);
    assert.equal(new Int64(waspInstanceMemoryUint32.buffer, offsetResult).toString(), expected,
                            'Failed sum operation - ' + offset1 + '-' +
                                                        offset2 + '-' +
                                                        expected);
}
    
const performDivOperation = (offset1, offset2, offsetResult, expected) => {
    waspInstance.exports.divTwo(offset1, offset2, offsetResult);
    assert.equal(new Int64(waspInstanceMemoryUint32.buffer, offsetResult).toString(), expected,
                            'Failed div operation - ' + offset1 + '-' +
                                                        offset2 + '-' +
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
        const offsetResult = 64;

        console.time('testWaspOffset');
        for (let i = 0; i < 100000; i++) {
            performSumOperation(0, 8, offsetResult, numbers.number1plus2);
            performSumOperation(0, 16, offsetResult, numbers.number1plus3);
            performSumOperation(0, 24, offsetResult, numbers.number1plus4);

            performDivOperation(0, 32, offsetResult, numbers.number1div5);
            performDivOperation(0, 40, offsetResult, numbers.number1div6);
            performDivOperation(0, 48, offsetResult, numbers.number1div7);
        }
        console.timeEnd('testWaspOffset');

        process.exit(0);
    })
    .catch(console.log);

