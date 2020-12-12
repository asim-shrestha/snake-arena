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
async def start_game(sid, gameData):
	await sio.save_session(sid, {}) # Clear session
	sio.enter_room(sid, sid)
	state = SocketHelper.create_game_state(gameData)
	sio.start_background_task(gameInterval, sid, state)
	return "OK" 

async def gameInterval(sid, state):
	# Wait for frames

	while True:
		await asyncio.sleep(1 / state['fps'])
		
		session = await sio.get_session(sid)
		numSnakes = SocketHelper.game_loop(state, session);
		isGameOver = is_game_over(state, numSnakes, session)

		if isGameOver: break

		# Game not over, emit data, wait, and rerun interval
		await sio.emit('game_state', state, room=sid)

	# Game is over
	state['isGameOver'] = True
	await sio.emit('game_over', state, room=sid)
	sio.leave_room(sid, sid)

def is_game_over(state, numSnakes, session):
	# Check if player quit
	if 'quit' in session.keys() and session['quit']:
		for snake in state['snakes']:
			snake['isAlive'] = False
			snake['death'] = "The game was forcefully ended"
		return True

	# Check if game ended
	if numSnakes > 1: return False	# Multiple snakes alive
	if numSnakes == 0: return True  # No snakes left
	if numSnakes == 1 and len(state['snakes']) > 1:
		SocketHelper.set_winner(state)
		return True # 1 Snake among many left

@sio.event
async def reset(sid):
	# Mark game as quit
	session = await sio.get_session(sid)
	session['quit'] = True
	await sio.save_session(sid, session)
	return "OK"

@sio.event
async def keydown(sid, keyCode):
	keyCode = int(keyCode)
	vel = get_velocity(keyCode)
	await sio.save_session(sid, vel.copy())
	
def get_velocity(keyCode):
	if keyCode == 37: return Directions.Left
	elif keyCode == 38: return Directions.Up
	elif keyCode == 39: return Directions.Right
	elif keyCode == 40: return Directions.Down
	else: return Directions.Still

@sio.event
def disconnect(sid):
	print('disconnect ', sid)