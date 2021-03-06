'use strict';

const numbers = require('./numbers');
const Int64Buffer = require("int64-buffer").Int64LE;

// constructor
const Int64 = function(numericString) {
    if (!numericString) return;
    // represent the number as a float with exponent 4
    this.sign = numericString.charCodeAt(0) === 45 ? (numericString = numericString.slice(1), -1) : 1;
    // pad with zeroes
    numericString = '00000'.substring(0, 5 - numericString.length) + numericString;
    // produce float
    this.mantissaInt = numericString.slice(0, numericString.length - 4);
    this.mantissaDec = numericString.slice(numericString.length - 4);
    this.mantissaDecFloat= parseFloat((this.sign === 1 ? '' : '-') + '0.' + this.mantissaDec);
    this.mantissaIntNumber = parseInt(this.mantissaInt, 10);
    this.mantissaIntNumberSigned = parseInt((this.sign === 1 ? '' : '-') + this.mantissaInt, 10);
    this.mantissaDecNumber = parseInt(this.mantissaDec, 10);
    this.mantissaDecNumberSub = parseInt('1' + this.mantissaDec, 10);
};

Int64.prototype = {

    toString: function() {
        return (this.sign === -1 ? '-' : '') + (this.mantissaInt + this.mantissaDec).replace(/^[0]+/g,'');
    },

    plus: function(anotherInt64) {
        if (this.sign === anotherInt64.sign) {
            let carry = 0;
            const sumDec = this.mantissaDecNumber + anotherInt64.mantissaDecNumber;
            let sumDecString = sumDec.toString();
            if (sumDecString.length > 4) {
                carry = 1;
                sumDecString = sumDecString.slice(1);
            }
            const sumInt = this.mantissaIntNumber + anotherInt64.mantissaIntNumber + carry;
            return new Int64((this.sign === -1 ? '-' : '') + sumInt.toString() + sumDecString);
        } else {
            let pos, neg;
            let borrow = 0;
            this.sign === -1 ? (pos = anotherInt64, neg = this) : (pos = this, neg = anotherInt64);
            const newSign = neg.absIsHigherThan(pos) ? -1 : 1;
            let subDec = pos.mantissaDecNumber - neg.mantissaDecNumber;
            if (subDec < 0) {
                if (newSign === -1) {
                    subDec = -subDec;
                } else {
                    subdec = pos.mantissaDecNumberSub - neg.mantissaDecNumber;
                    borrow = 1;
                }
            }
            let subDecString = subDec.toString();
            subDecString = '00000'.substring(0, 4 - subDecString.length) + subDecString;

            const subInt = Math.abs(pos.mantissaIntNumber - neg.mantissaIntNumber - borrow);

            return new Int64((newSign === -1 ? '-' : '') + subInt.toString() + subDecString);            
        }
    },

    plusFloat: function(anotherInt64) {
        let sumDecIntDec = (this.mantissaDecFloat + anotherInt64.mantissaDecFloat).toFixed(4).toString().split('.');
        const sumInt = this.mantissaIntNumberSigned + anotherInt64.mantissaIntNumberSigned + parseInt(sumDecIntDec[0]);
        return new Int64(sumInt.toString() + sumDecIntDec[1]);
    },

    absIsHigherThan: function(anotherInt64) {
        if (this.mantissaIntNumber > anotherInt64.mantissaIntNumber) {
            return true;
        } else if (this.mantissaIntNumber === anotherInt64.mantissaIntNumber) {
            return this.mantissaDecNumber > anotherInt64.this.mantissaIntNumber > anotherInt64.mantissaIntNumber;
        }

        return false;

    }
};


module.exports = Int64;

