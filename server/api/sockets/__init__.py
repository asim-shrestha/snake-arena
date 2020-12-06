import eventlet
import socketio
import asyncio
import logging
from . import SocketHelper
from . import Directions

sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins=[], logger=True)
sio_app = socketio.ASGIApp(sio)

@sio.event
def connect(sid, environ):
	print('connect ', sid)
	return "OK"

@sio.event
async def start_game(sid, data):
	await sio.save_session(sid, {}) # Clear session
	state = SocketHelper.create_game_state(data['width'], data['height'], data['snakes'])
	sio.start_background_task(gameInterval, sid, state)
	return "OK" 

async def gameInterval(sid, state):
	# Wait for frames 
	FPS = 10
	await asyncio.sleep(1 / FPS)
	
	session = await sio.get_session(sid)
	numSnakes = SocketHelper.game_loop(state, session);
	isGameOver = is_game_over(state, numSnakes)
	if not isGameOver:
		# Game not over, emit data, wait, and rerun interval
		await sio.emit('game_state', state)
		await gameInterval(sid, state)
	else:
		await sio.emit('game_state', state)
		await sio.emit('game_over', state)

def is_game_over(state, numSnakes):
	if numSnakes > 1: return False	# Multiple snakes alive
	if numSnakes == 0: return True  # No snakes left
	if numSnakes == 1 and len(state['snakes']) > 1:
		SocketHelper.set_winner(state)
		return True # 1 Snake among many left

@sio.event
async def keydown(sid, keyCode):
	keyCode = int(keyCode)
	vel = get_velocity(keyCode)
	await sio.save_session(sid, vel)
	
def get_velocity(keyCode):
	if keyCode == 37: return Directions.Left
	elif keyCode == 38: return Directions.Up
	elif keyCode == 39: return Directions.Right
	elif keyCode == 40: return Directions.Down
	else: return Directions.Still

@sio.event
def disconnect(sid):
	print('disconnect ', sid)