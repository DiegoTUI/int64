(module 
(import "js" "mem" (memory 1))
 (func $build
    (param $h i32) (param $l i32)
    (result i64)
    
    (i64.or
      (i64.shl (i64.extend_u/i32 (get_local $h)) (i64.const 32))
      (i64.extend_u/i32 (get_local $l)))
  )
  
  (func $store (param $x i64)
    (i64.store (i32.const 0) (get_local $x))
  )
  
  (func $return (param $x i64) (result i32)
    (call $store (get_local $x))
    (i32.wrap/i64 (get_local $x))
  )

  (func (export "add") 
    (param $ah i32) (param $al i32) (param $bh i32) (param $bl i32)
    (result i32)
   
    (call $return
      (i64.add
        (call $build (get_local $ah) (get_local $al))
        (call $build (get_local $bh) (get_local $bl))))
  )
)