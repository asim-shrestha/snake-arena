package main

import (
	"C"
	"container/list"
	"fmt"
	"math"
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

// Heuristics used for the smart snake algorithm to make decisions
type Heuristics struct {
	foodWeight int
	emptySpaceWeight int
	aggressivenessWeight int
	avoidanceWeight int
}

// Node for iterative BFS
type BFSNode struct {
	pos Position
	depth int
}

type BFSResult struct {
	foodDepth int
	emptySpaceDepth int
	nearestHeadDepth int
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
	validPositions := GetValidPositions(state.currPos, state)

	// No valid directions possible, return a random direction
	if len(validPositions) == 0 { return GetRandomDirection() }

	// Valid direction available, randomly pick one
	return GetDirectionFromRandomPosition(validPositions, state)
}

//export HungrySnake
// Snake that moves directly to the nearest food
// Leverages smart snake algorithm by abusing nearest food heuristic
func HungrySnake(stateStr, currX, currY string) *C.char {
	heuristicsStr := "100,1,1,1"
	return SmartSnake(stateStr, currX, currY, heuristicsStr)
}

//export SmartSnake
func SmartSnake(stateStr, currX, currY, heuristicsStr string) *C.char {
	state := DecodeState(stateStr, currX, currY)
	validPositions := GetValidPositions(state.currPos, state)

	// No valid directions possible, return a random direction
	if len(validPositions) == 0 { return GetRandomDirection() }

	// Only one position, don't use heuristics
	if len(validPositions) == 1 { return GetDirectionFromRandomPosition(validPositions, state) }

	// Get direction through heuristics
	heuristics := DecodeHeuristics(heuristicsStr)
	return GetDirectionFromHeuristics(validPositions, state, heuristics)
}

func GetDirectionFromHeuristics(positions []Position, state State, heuristics Heuristics) *C.char {
	maxPosition := positions[0]
	values := []int{0, 0, 0, 0}
	maxWeight := 0
	for i, pos := range positions {
		weight := getPositionWeight(pos, state, heuristics)
		if weight > maxWeight {
			maxPosition = pos
			maxWeight = weight
		}
		values[i] = weight

	}

	fmt.Printf("positions: %v\n, weights%v\n", positions, values)
	fmt.Printf("MaxWeight: %v, MaxPos:%v\n", maxWeight, maxPosition)
	// Abuse function to return the string of our max position
	if maxWeight == 0 { return GetDirectionFromRandomPosition(positions, state)}
	return GetDirectionFromRandomPosition([]Position{maxPosition}, state)
}

func getPositionWeight(pos Position, state State, heuristics Heuristics) int {
	MaxDepth := 15
	res := BFS(state.board, pos, state, 3, MaxDepth)
	foodWeight := (MaxDepth - res.foodDepth) * heuristics.foodWeight // Closer the food, the more it weighs
	emptySpaceWeight := res.emptySpaceDepth * heuristics.emptySpaceWeight // More open space, the more it weighs
	weight := foodWeight + emptySpaceWeight
	return weight
}


// Returns the closes depth of a search value within a given matrix
// Will only go as deep as maxDepth allows
func BFS(mat [][]int, startPos Position, state State, searchVal, maxDepth int) BFSResult {
	res := BFSResult{foodDepth: maxDepth}
	queue := list.New()
	queue.PushBack(BFSNode{startPos, 1})
	matrix := duplicateMatrix(mat)
	for queue.Len() > 0 {
		// Get next element
		curr := queue.Front()
		node := curr.Value.(BFSNode)
		pos := node.pos
		queue.Remove(curr)

		// Max depth reached
		if node.depth > maxDepth { break }

		// Test if we found the closes food position
		if res.foodDepth == maxDepth {

			if matrix[pos.x][pos.y] == 3 {
				fmt.Printf("Checking val: x:%v, y:%v : %v\n", pos.x, pos.y, matrix[pos.y][pos.x])
				res.foodDepth = int(math.Abs(float64(pos.x) - float64(startPos.x)))
				res.foodDepth += int(math.Abs(float64(pos.y) - float64(startPos.y)))
			}
		}

		// TODO Test if we found a enemy head

		// Mark as visited
		matrix[pos.x][pos.y] = 1

		// Add next elements to queue
		addValidPositionsToQueue(queue, matrix, pos, state, node.depth + 1)

		// Update max depth
		if node.depth + 1 > res.emptySpaceDepth {
			res.emptySpaceDepth = node.depth + 1
		}
	}

	return res
}

func duplicateMatrix(matrix [][]int) [][]int {
	duplicate := make([][]int, len(matrix))
	for i := range matrix {
		duplicate[i] = make([]int, len(matrix[i]))
		copy(duplicate[i], matrix[i])
	}
	return duplicate
}

func addValidPositionsToQueue(queue *list.List, matrix [][]int, pos Position, state State, depth int) {
	validPositions := GetValidPositions(pos, state)
	for _, pos := range validPositions {
		// Don't look at the same value
		if matrix[pos.x][pos.y] == 1 { continue }
		(*queue).PushBack(BFSNode{pos, depth})
	}
}

func GetValidPositions(startPos Position, state State) []Position {
	var validPositions []Position
	movePositions := GetAllMovePositions(startPos)
	// Loop through all directions and append valid ones
	for _, pos := range movePositions {
		if isValidPosition(pos, state) {
			validPositions = append(validPositions, pos)
		}
	}

	return validPositions
}

func GetAllMovePositions(pos Position) []Position {
	return []Position{
		{pos.x - 1, pos.y},
		{pos.x, pos.y - 1},
		{pos.x + 1, pos.y},
		{pos.x, pos.y + 1},
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
	fmt.Printf("DIRECTIONS: %v\n", GetDirectionFromPosition(pos, state))
	return C.CString(GetDirectionFromPosition(pos, state))
}

func GetDirectionFromPosition(pos Position, state State) string {
	velX := pos.x - state.currPos.x
	velY := pos.y - state.currPos.y
	fmt.Printf("currpos: %v, nextpos%v\n", state.currPos, pos)
	fmt.Printf("xVel: %v, yVel%v\n", velX, velY)
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

func DecodeHeuristics(heuristicsStr string) Heuristics {
	vals := []int{0, 0, 0, 0}

	// Strip values from string and convert them to ints
	decodedVals := strings.Split(heuristicsStr, ",")
	for i, v := range decodedVals { vals[i] = strToInt(v)}

	return Heuristics{vals[0], vals[1], vals[2], vals[3]}
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