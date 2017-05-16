'use strict';

const Go = require('gonode').Go;
const assert = require('assert');

const numbers = require('./numbers');
 
const options = {
    path		: 'gonode.go',
    initAtOnce	: true,	
}

let go;


const initGo = () => new Promise(resolve => {
    go = new Go(options, resolve);
});

const performOperation = (n1, n2, op, expected) => new Promise(resolve => {
    go.execute({n1: n1, n2: n2, op: op}, function(result, response) {
        console.log(response.response, expected);
        assert.equal(response.response, expected, 'Failed: ' + n1 + ' - ' + n2 + ' - ' + op);
        return resolve();
    });
});


initGo()
    .then(() => performOperation(numbers.number1, numbers.number2, 'sum', numbers.number1plus2))
    .then(() => go.close())
    .then(() => process.exit(0));


const test = (n1, n2, op, expected) => {
    return new Promise(resolve => {
        const go = new Go(options, () => {
            go.execute({n1: n1, n2: n2, op: op}, function(result, response) {
                assert.equal(response.response, expected, 'Failed: ' + n1 + ' - ' + n2 + ' - ' + op);
                
                go.close();

                return resolve();
            });
        });
    });
}

/*test('123', '222', 'div', 0.5540540540540541)
    .then(() => console.log('done'))*/


/*const go2 = new Go(options, (err) => {
    if (err) throw err;
 
    for(let i = 0; i < 100; i++) {
        console.log(i)
        go2.execute({n1: '123', n2: '222', op: 'div'}, function(result, response) {
            if(result.ok) {
                console.log('Go responded: ' + response.response);
            }
        });
    }
    
 
    go2.close();
});*/
