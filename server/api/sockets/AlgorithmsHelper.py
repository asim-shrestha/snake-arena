from ctypes import *
from ctypes import cdll
import time

class go_string(Structure):
    _fields_ = [
        ("p", c_char_p),
        ("n", c_int)]

lib = cdll.LoadLibrary('./algorithms/Algorithms.so')

def bar(str):
    lib.bar.restype = c_char_p
    a = lib.bar()
    print(a)

bar("haha")