(module
  (import "console" "log" (func $log (param i32)))
  (import "js" "mem" (memory 1))
  (func (export "addTwo")
    (local $first i64)
    (local $second i64)
    (local $result i64)
    (set_local $first (i64.load (i32.const 0)))
    (set_local $second (i64.load (i32.const 8)))
    (set_local $result (i64.add (get_local $first) (get_local $second)))
    (i64.store (i32.const 16) (get_local $result))
    )
)