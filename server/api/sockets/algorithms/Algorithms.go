package main

import (
	"C"
	"fmt"
	"math/rand"
	"strconv"
	"strings"
	"time"
)

var gen = rand.New(rand.NewSource(time.Now().UnixNano()))
var directionStrings = []string{"left", "up", "right", "down"}

// Struct that represents the current position of the snake
type Position struct {
	x, y int
}

// Struct that represents the decoded game state sent by python
type State struct {
	width, height int
	board [][] int
	currPos Position
}

//export BadSnake
// Snake that moves completely randomly
func BadSnake() *C.char {
	return GetRandomDirection()
}

//export RandomSnake
// Snake that moves randomly but avoids obstacles
func RandomSnake(stateStr, currX, currY string) *C.char {
	state := DecodeState(stateStr, currX, currY)
	validPositions := GetValidPositions(state)

	// No valid directions possible, return a random direction
	if len(validPositions) == 0 { return GetRandomDirection() }

	// Valid direction available, randomly pick one
	return GetDirectionFromRandomPosition(validPositions, state)
}

//export HungrySnake
// Snake that moves directly to the nearest food
func HungrySnake(stateStr, currX, currY string) *C.char {
	return GetRandomDirection()
}

//export SmartSnake
func SmartSnake(stateStr, currX, currY string) *C.char {
	return GetRandomDirection()
}

func GetValidPositions(state State) []Position {
	var validPositions []Position
	movePositions := GetAllMovePositions(state)
	// Loop through all directions and append valid ones
	for _, pos := range movePositions {
		if isValidPosition(pos, state) {
			validPositions = append(validPositions, pos)
		}
	}

	return validPositions
}

func GetAllMovePositions(state State) []Position {
	return []Position{
		{state.currPos.x - 1, state.currPos.y},
		{state.currPos.x, state.currPos.y - 1},
		{state.currPos.x + 1, state.currPos.y},
		{state.currPos.x, state.currPos.y + 1},
	}
}

func isValidPosition(pos Position, state State) bool {
	return isPositionInBounds(pos, state) && isPositionSafe(pos, state)
}

func isPositionInBounds(pos Position, state State) bool {
	xIn := pos.x >= 0 && pos.x < state.width
	yIn := pos.y >= 0 && pos.y < state.height
	return xIn && yIn
}

// What values in board matrix mean: 0 == nothing, 1 == current snake, 2 == enemy snake, 3 == food
func isPositionSafe(pos Position, state State) bool {
	boardVal := state.board[pos.x][pos.y]
	return boardVal == 0 || boardVal == 3
}

func GetDirectionFromRandomPosition(positions []Position, state State) *C.char {
	idx := gen.Intn(len(positions))
	pos := positions[idx]
	return C.CString(GetDirectionFromPosition(pos, state))
}

func GetDirectionFromPosition(pos Position, state State) string {
	velX := pos.x - state.currPos.x
	velY := pos.y - state.currPos.y
	if velX == -1 && velY ==  0 { return directionStrings[0] }
	if velX ==  0 && velY == -1 { return directionStrings[1] }
	if velX ==  1 && velY ==  0 { return directionStrings[2] }
	return directionStrings[3]
}

func GetRandomDirection() *C.char {
	randomIdx := gen.Intn(len(directionStrings))
	return C.CString(directionStrings[randomIdx])
}

func DecodeState(stateStr, currX, currY string) State {
	currPos := Position{strToInt(currX), strToInt(currY)}
	board, width, height := DecodeStateStr(stateStr)
	return State{width, height, board, currPos	}
}

func DecodeStateStr(stateStr string) ([][]int, int, int) {
	// Split by row
	rows := strings.Split(stateStr, ",")

	// Get dimensions
	height := len(rows)
	width := 0
	if len(rows) > 0 { width = len(rows[0]) }

	// Create board variable
	board := make([][]int, height)
	for i := range board {
		board[i] = make([]int, width)
	}

	// Populate board
	for i, row := range rows {
		cols := strings.Split(row, "")
		for j, col := range cols {
			board[i][j] = strToInt(col)
		}
	}

	return board, width, height
}

func strToInt(str string) int {
	val, err := strconv.Atoi(str)
	if err != nil {
		// handle error
		return 0
	}
	return val
}

func Remove (arr []string, idx int) {
	arr[idx] = arr[len(arr)-1] // Copy last element to index i.
	arr[len(arr) - 1] = ""   // Erase last element (write zero value).
	arr = arr[:len(arr)-1]   // Truncate slice.
}

func main() {}