import eventlet
import socketio
from . import SocketHelper

sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins=[], logger=True)
sio_app = socketio.ASGIApp(sio)


@sio.event
def connect(sid, environ):
	print('connect ', sid)
	return "OK"


@sio.event
def start_game(sid, data):
	return SocketHelper.start_game(data['width'], data['height'])
	return "OK"

@sio.event
def test(sid, data):
	return "OK"


@sio.event
def disconnect(sid):
	print('disconnect ', sid)
