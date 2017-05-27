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

const n1plusn2Int64buf = new Int64Buffer(numbers.number1plus2, 10).toBuffer();
const n1plusn3Int64buf = new Int64Buffer(numbers.number1plus3, 10).toBuffer();
const n1plusn4Int64buf = new Int64Buffer(numbers.number1plus4, 10).toBuffer();

const n1divn5Int64buf = new Int64Buffer(numbers.number1div5, 10).toBuffer();
const n1divn6Int64buf = new Int64Buffer(numbers.number1div6, 10).toBuffer();
const n1divn7Int64buf = new Int64Buffer(numbers.number1div7, 10).toBuffer();


let waspInstance;
const waspInstanceMemoryUint32 = new Uint32Array(memory.buffer);
const waspInstanceMemoryBuffer = new Buffer(memory.buffer);

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
        return new Int64(waspInstanceMemoryBuffer, 16);
    },

    dividedBy: function(anotherInt64) {
        waspInstanceMemoryUint32[0] = this.low;
        waspInstanceMemoryUint32[1] = this.high;
        waspInstanceMemoryUint32[2] = anotherInt64.low;
        waspInstanceMemoryUint32[3] = anotherInt64.high;
        waspInstance.exports.divTwo();
        return new Int64(waspInstanceMemoryBuffer, 16);
    },

    equals: function(anotherInt64) {
        return (this.low === anotherInt64.low) && (this.high === anotherInt64.high);
    },

    toString: function() {
        return new Int64Buffer(this.high, this.low).toString();
    }
}

const n1Int64 = new Int64(n1Int64buf);
const n2Int64 = new Int64(n2Int64buf);
const n3Int64 = new Int64(n3Int64buf);
const n4Int64 = new Int64(n4Int64buf);
const n5Int64 = new Int64(n5Int64buf);
const n6Int64 = new Int64(n6Int64buf);
const n7Int64 = new Int64(n7Int64buf);

const n1plusn2Int64 = new Int64(n1plusn2Int64buf);
const n1plusn3Int64 = new Int64(n1plusn3Int64buf);
const n1plusn4Int64 = new Int64(n1plusn4Int64buf);

const n1divn5Int64 = new Int64(n1divn5Int64buf);
const n1divn6Int64 = new Int64(n1divn6Int64buf);
const n1divn7Int64 = new Int64(n1divn7Int64buf);

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

        assert(n1Int64.plus(n2Int64).equals(n1plusn2Int64));
        assert(n1Int64.plus(n3Int64).equals(n1plusn3Int64));
        assert(n1Int64.plus(n4Int64).equals(n1plusn4Int64));

        console.time('testWasp');
        for (let i = 0; i < numbers.NUM_ITERATIONS; i++) {
            n1Int64.plus(n2Int64);
            n1Int64.plus(n3Int64);
            n1Int64.plus(n4Int64);

            n1Int64.dividedBy(n5Int64);
            n1Int64.dividedBy(n6Int64);
            n1Int64.dividedBy(n7Int64);
        }
        console.timeEnd('testWasp');

        process.exit(0);
    })
    .catch(console.log);

