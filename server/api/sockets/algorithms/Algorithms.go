package main

import (
	"C"
	"math/rand"
	"time"
)

var gen = rand.New(rand.NewSource(time.Now().UnixNano()))
var allDirections = []string{"left", "up", "right", "down"}

//export BadSnake
// Snake that moves completely randomly
func BadSnake() *C.char {
	return GetRandomDirection()
}

//export RandomSnake
// Snake that moves randomly but avoids obstacles
func RandomSnake() *C.char {
	availableDirections := allDirections

	// Loop through and get direction
	for len(allDirections) > 0 {
		idx := gen.Intn(len(availableDirections))
		dir := availableDirections[idx]
		if IsValidDirection(dir) { return C.CString(dir) }
		Remove(availableDirections, idx)
	}

	// No valid direction available, just pick at random
	return GetRandomDirection()
}

//export HungrySnake
// Snake that moves directly to the nearest food
func HungrySnake() *C.char {
	return GetRandomDirection()
}

//export SmartSnake
func SmartSnake() *C.char {
	return GetRandomDirection()
}

func GetRandomDirection() *C.char {
	randomIdx := gen.Intn(len(allDirections))
	return C.CString(allDirections[randomIdx])
}

func IsValidDirection(dir string) bool {
	return false
}

func Remove (arr []string, idx int) {
	arr[idx] = arr[len(arr)-1] // Copy last element to index i.
	arr[len(arr) - 1] = ""   // Erase last element (write zero value).
	arr = arr[:len(arr)-1]   // Truncate slice.
}

func main() {}