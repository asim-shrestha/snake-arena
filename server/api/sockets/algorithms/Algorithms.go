package main

import (
	"C"
)

//export bar
func bar() *C.char {
	return C.CString("Result from go")
}

func main() {}