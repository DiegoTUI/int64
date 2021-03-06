package main

import (
	"flag"
	"fmt"
	"strconv"
)

func main() {
	n1 := flag.Int64("n1", 0, "n1")
	n2 := flag.Int64("n2", 0, "n2")
	op := flag.String("op", "sum", "op")

	flag.Parse()

	switch *op {
	case "div":
		fmt.Print(strconv.FormatInt((*n1)/(*n2), 10))
	default:
		fmt.Print(strconv.FormatInt((*n1)+(*n2), 10))
	}
}
