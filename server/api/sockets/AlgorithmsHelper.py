from ctypes import *
from ctypes import cdll
import time
import os


# Build with -> go build -buildmode=c-shared -o Algorithms.so Algorithms.go
lib = cdll.LoadLibrary('./api/sockets/algorithms/Algorithms.so')

def bad_snake():
	lib.BadSnake.restype = c_char_p
	return lib.BadSnake().decode("utf-8")