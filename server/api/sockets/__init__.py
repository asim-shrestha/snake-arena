import eventlet
import socketio
import asyncio
import logging
from . import SocketHelper

sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins=[], logger=True)
sio_app = socketio.ASGIApp(sio)

FRAME_RATE = 10
@sio.event
def connect(sid, environ):
	print('connect ', sid)
	return "OK"

@sio.event
async def start_game(sid, data):
	await sio.save_session(sid, {}) # Clear session
	state = SocketHelper.create_game_state(data['width'], data['height'])
	sio.start_background_task(gameInterval, sid, state)
	return "OK" 

async def gameInterval(sid, state):
	# Wait for frames 
	FPS = 15
	await asyncio.sleep(1 / FPS)
	
	session = await sio.get_session(sid)
	numSnakes = SocketHelper.game_loop(state, session);
	if numSnakes > 0:
		# Game not over, emit data, wait, and rerun interval
		await sio.emit('game_state', state)
		await gameInterval(sid, state)
	else:
		await sio.emit('game_over', state)

@sio.event
async def keydown(sid, keyCode):
	keyCode = int(keyCode)
	vel = get_velocity(keyCode)
	logging.error(vel)
	await sio.save_session(sid, vel)
	
def get_velocity(keyCode):
	if keyCode == 37: return {'x': -1, 'y':  0}
	elif keyCode == 38: return {'x':  0, 'y':  -1}
	elif keyCode == 39: return {'x':  1, 'y':  0}
	elif keyCode == 40: return {'x':  0, 'y': 1}
	else: return {'x':  0, 'y': 0}

@sio.event
def test(sid, data):
	return "OK"


@sio.event
def disconnect(sid):
	print('disconnect ', sid)
