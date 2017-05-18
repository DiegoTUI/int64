'use strict';

const fs = require('fs');
const buf = fs.readFileSync('./addTwoInt64.wasm');
const Int64 = require("int64-buffer").Int64LE

const memory = new WebAssembly.Memory({initial:1});

// `Wasm` does **not** understand node buffers, but thankfully a node buffer
// is easy to convert to a native Uint8Array.
function toUint8Array(buf) {
  var u = new Uint8Array(buf.length);
  for (var i = 0; i < buf.length; ++i) {
    u[i] = buf[i];
  }
  return u;
}

WebAssembly.compile(toUint8Array(buf))
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
        const n1 = '1223372036854775808';
        const n2 = '1523372036854775808';
        const n1Int64 = new Int64(n1, 10);
        const n2Int64 = new Int64(n2, 10);
        const i32 = new Uint32Array(memory.buffer);
        i32[0] = n1Int64.toBuffer().readUInt32LE(0);
        i32[1] = n1Int64.toBuffer().readUInt32LE(4);
        i32[2] = n2Int64.toBuffer().readUInt32LE(0);
        i32[3] = n2Int64.toBuffer().readUInt32LE(4);
        instance.exports.addTwo();
        const result = new Int64(i32.buffer, 16);
        console.log(i32[0], i32[1], i32[2], i32[3], i32[4], i32[5], i32[6], i32[7])
        console.log(result.toString())
        process.exit(0);
    })
    .catch(console.log);

