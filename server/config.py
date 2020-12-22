import os

LOCALHOST = '0.0.0.0'
HOST = LOCALHOST
PORT = os.environ.get('PORT')
if PORT == None: PORT = 5000