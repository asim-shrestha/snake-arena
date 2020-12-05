from ctypes import *
from ctypes import cdll
import time
import os

# Help to build this from https://gist.github.com/helinwang/4f287a52efa4ab75424c01c65d77d939
# Below function taken from link
class go_string(Structure):
    _fields_ = [
        ("p", c_char_p),
        ("n", c_int)]

# Build with -> go build -buildmode=c-shared -o Algorithms.so Algorithms.go
lib = cdll.LoadLibrary('./api/sockets/algorithms/Algorithms.so')

def bad_snake():
	lib.BadSnake.restype = c_char_p
	return lib.BadSnake().decode("utf-8")

def random_snake(state, snake):
	lib.RandomSnake.restype = c_char_p
	encodedState = get_encoded_state(state, snake)
	currX = str(snake['pos']['x'])
	currY = str(snake['pos']['y'])
	return lib.RandomSnake(GetGoString(encodedState), GetGoString(currX), GetGoString(currY)).decode("utf-8")

def hungry_snake(state, snake):
	lib.HungrySnake.restype = c_char_p
	return lib.BadSnake().decode("utf-8")

def smart_snake(state, snake):
	lib.SmartSnake.restype = c_char_p
	return lib.BadSnake().decode("utf-8")

def encode_state(state, snake):
	stateMat = get_state_matrix(state)
	stateStr = stringify_matrix()
	return stateStr

def get_encoded_state(state, currSnake):
	matrix = get_state_matrix(state, currSnake)
	return stringify_matrix(matrix)
# Encode game state as a matrix
# 0 == nothing, 1 == current snake, 2 == enemy snake, 3 == food
def get_state_matrix(state, currSnake):
	matrix = [[0 for col in range(state['width'])] for row in range(state['height'])]
	
	# Encode snakes
	for snake in state['snakes']:
		set_values_at_pos_list(matrix, snake['body'], 2)

	# Encode food
	set_values_at_pos_list(matrix, state['food'], 3)

	# Encode current snake
	# Do this last to overwrite the all snake encoding value
	set_values_at_pos_list(matrix, currSnake['body'], 1)
	return matrix

def set_values_at_pos_list(matrix, posList, value):
	for pos in posList:
			matrix[pos['x']][pos['y']] = value

def stringify_matrix(matrix):
	res = ""
	for i in range(len(matrix)):
		for j in range(len(matrix[i])):
			res += str(matrix[i][j])
		res += ","

	# Remove last ","
	res = res[:-1]
	return res

def GetGoString(inputStr):
	return go_string(c_char_p(inputStr.encode('utf-8')), len(inputStr))