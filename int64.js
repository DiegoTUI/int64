'use strict';

const numbers = require('./numbers');
const Int64Buffer = require("int64-buffer").Int64LE;

// constructor
const Int64 = function(number) {
    this.model = typeof number === 'string' ? 
                    new Int64Buffer(number, 10) :
                    new Int64Buffer(number);
    this.buffer = this.model.toBuffer();
};

Int64.prototype = {

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

module.exports = Int64;

