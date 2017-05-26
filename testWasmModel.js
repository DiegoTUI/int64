'use strict';

const fs = require('fs');
const assert = require('assert');
const buf = fs.readFileSync('./int64.wasm');
const Int64Buffer = require("int64-buffer").Int64LE
const numbers = require('./numbers');

const memory = new WebAssembly.Memory({initial:1});

const n1Int64buf = new Int64Buffer(numbers.number1, 10).toBuffer();
const n2Int64buf = new Int64Buffer(numbers.number2, 10).toBuffer();
const n3Int64buf = new Int64Buffer(numbers.number3, 10).toBuffer();
const n4Int64buf = new Int64Buffer(numbers.number4, 10).toBuffer();
const n5Int64buf = new Int64Buffer(numbers.number5, 10).toBuffer();
const n6Int64buf = new Int64Buffer(numbers.number6, 10).toBuffer();
const n7Int64buf = new Int64Buffer(numbers.number7, 10).toBuffer();

let waspInstance;
const waspInstanceMemoryUint32 = new Uint32Array(memory.buffer);

const Int64 = function(buffer, offset) {
    offset = offset || 0;
    this.low = buffer.readUInt32LE(offset + 0);
    this.high = buffer.readUInt32LE(offset + 4);
};

Int64.prototype = {

    plus: function(anotherInt64) {
        waspInstanceMemoryUint32[0] = this.low;
        waspInstanceMemoryUint32[1] = this.high;
        waspInstanceMemoryUint32[2] = anotherInt64.low;
        waspInstanceMemoryUint32[3] = anotherInt64.high;
        waspInstance.exports.addTwo();
        return new Int64(waspInstanceMemoryUint32.buffer, 16);
    },

    dividedBy: function(anotherInt64) {
        waspInstanceMemoryUint32[0] = this.low;
        waspInstanceMemoryUint32[1] = this.high;
        waspInstanceMemoryUint32[2] = anotherInt64.low;
        waspInstanceMemoryUint32[3] = anotherInt64.high;
        waspInstance.exports.divTwo();
        return new Int64(waspInstanceMemoryUint32.buffer, 16);
    }
}

const n1Int64 = new Int64(n1Int64buf);
const n2Int64 = new Int64(n2Int64buf);
const n3Int64 = new Int64(n3Int64buf);
const n4Int64 = new Int64(n4Int64buf);

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
            n1Int64.plus(n2Int64);
            n1Int64.plus(n3Int64);
            n1Int64.plus(n4Int64);

            //performDivOperation(n1Int64, n5Int64, numbers.number1div5);
            //performDivOperation(n1Int64, n6Int64, numbers.number1div6);
            //performDivOperation(n1Int64, n7Int64, numbers.number1div7);
        }
        console.timeEnd('testWasp');

        process.exit(0);
    })
    .catch(console.log);

