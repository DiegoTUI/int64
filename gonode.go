package main

import (
	"strconv"

	json "github.com/jgranstrom/go-simplejson"
	gonode "github.com/jgranstrom/gonodepkg"
)

func main() {
	gonode.Start(process)
}

func process(cmd *json.Json) (response *json.Json) {
	response, m, _ := json.MakeMap()

	n1, _ := strconv.ParseInt(cmd.Get("n1").MustString(), 10, 64)
	n2, _ := strconv.ParseInt(cmd.Get("n2").MustString(), 10, 64)
	op := cmd.Get("op").MustString()

	switch op {
	case "div":
		m["response"] = strconv.FormatFloat(float64(n1)/float64(n2), 'f', -1, 64)
	default:
		m["response"] = strconv.FormatInt(n1+n2, 10) //(string)(n1 + n2)
	}

	return
}
