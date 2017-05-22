'use strict';

const numbers = require('./numbers');
const Int64Buffer = require("int64-buffer").Int64LE;

// constructor
const Int64 = function(number) {
    this.model = typeof number === 'string' ? 
                    new Int64Buffer(number, 10) :
                    new Int64Buffer(number);
    this.buffer = this.model.toBuffer();
    this.bits = this.toBits();
};

Int64.prototype = {

    toBits: function() {
        const resultBuffer = new Buffer(64);
        for (let i = 0; i < 8; i++) {
            const littelEndianBits = this.buffer[i].toString(2).split('').reverse()
            for(let j = 0; j < 8; j++) {
                resultBuffer[8*i + j] = littelEndianBits[j] || 0;
            }
        }

        return resultBuffer;
    },

    toString: function() {
        return this.model.toString();
    },

    plus: function(anotherInt64) {
        const resultBuffer = new Buffer(8);
        const buffer1 = this.buffer;
        const buffer2 = anotherInt64.buffer;
        let carry = 0;
        for (let i = 0; i < 8; i++) {
            let res = buffer1[i] + buffer2[i] + carry;
            carry = res > 255;
            resultBuffer[i] = carry ? res - 256 : res;
        }

        return new Int64(resultBuffer);
    },

    plusBits: function(anotherInt64) {
        const resultBuffer = new Buffer(8);
        const bits1 = this.bits;
        const bits2 = anotherInt64.bits;
        const resultBits = new Array(64);
        let carry = 0;
        for (let i = 0; i < 64; i++) {
            let res = bits1[i] + bits2[i] + carry;
            carry = res > 1;
            resultBits[i] = carry ? res - 2 : res;
        }

        return new Int64(bufferFromLEBits(resultBits));
    },

    twosCompliment: function() {
        let bytes = this.buffer;
        let carry = 1;

        for (let i = 7; i >= 0; i--) {
            let value = (bytes[i] ^ 0xff) + carry;
            bytes[i] = value & 0xff;
            carry = value >> 8;
        }
    }
};

function bufferFromLEBits(leBits) {
    const resultBuffer = new Buffer(8);
    for (let i = 0; i < 8; i++) {
        resultBuffer[i] = parseInt(leBits.slice(8*i, 8*(i+1)).reverse().join(''), 2);
    }

    return resultBuffer;
}

module.exports = Int64;

