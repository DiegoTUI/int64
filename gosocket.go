package main

import (
	"log"
	"net"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"syscall"
)

func int64Server(c net.Conn) {
	for {
		buf := make([]byte, 512)
		nr, err := c.Read(buf)
		if err != nil {
			return
		}

		data := string(buf[0:nr])

		operands := strings.Split(data, "|")
		n1, _ := strconv.ParseInt(operands[0], 10, 64)
		n2, _ := strconv.ParseInt(operands[1], 10, 64)
		op := operands[2]

		var result []byte
		switch op {
		case "div":
			result = []byte(strconv.FormatInt(n1/n2, 10))
		default:
			result = []byte(strconv.FormatInt(n1+n2, 10))
		}

		_, err = c.Write(result)
		if err != nil {
			log.Fatal("Write: ", err)
		}
	}
}

func main() {

	listener, err := net.Listen("unix", "/tmp/int64.sock")
	if err != nil {
		log.Fatal("listen error:", err)
	}

	// get notifications of SIGINT and close the listener
	sigc := make(chan os.Signal, 1)
	signal.Notify(sigc, os.Interrupt, os.Kill, syscall.SIGTERM, syscall.SIGKILL)

	go func(c chan os.Signal) {
		sig := <-c
		log.Printf("Caught signal %s: shutting down.", sig)

		listener.Close()
		os.Exit(0)
	}(sigc)

	for {
		feed, err := listener.Accept()
		if err != nil {
			log.Fatal("accept error:", err)
		}

		go int64Server(feed)
	}
}
