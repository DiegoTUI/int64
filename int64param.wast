(module
  (import "js" "mem" (memory 1))
  (func (export "addTwo") (param $firstlow i32) (param $firsthigh i32) (param $secondlow i32) (param $secondhigh i32)
    (local $first i64)
    (local $second i64)
    (local $result i64)
    (i32.store (i32.const 8) (get_local $firstlow))
    (i32.store (i32.const 12) (get_local $firsthigh))
    (i32.store (i32.const 16) (get_local $secondlow))
    (i32.store (i32.const 20) (get_local $secondhigh))
    (set_local $first (i64.load (i32.const 8)))
    (set_local $second (i64.load (i32.const 16)))
    (set_local $result (i64.add (get_local $first) (get_local $second)))
    (i64.store (i32.const 0) (get_local $result))
  )
)