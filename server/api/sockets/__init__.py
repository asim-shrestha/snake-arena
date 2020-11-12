import socketio

sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins=[])
sio_app = socketio.ASGIApp(sio)


@sio.event
def connect(sid, environ):
	print('connect ', sid)
	return ""


@sio.event
def message(sid, data):
	return "OK", "Message recieved"


@sio.event
def disconnect(sid):
	print('disconnect ', sid)
	return "OK", "Disconnected"
