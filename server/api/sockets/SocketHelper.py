import logging
import random
from . import AlgorithmsHelper
from . import Directions

def create_game_state(width, height):
	return {
		'width': width,
		'height': height,
		'spawn_rate': 2,
		'turns_till_food': 50,
		'turns_since_food': 0,
		'food': [
			{'x': 3, 'y': 3},
			{'x': 4, 'y': 4},
		],
		'snakes': [
			{
				'name': 'Asim',
				'hunger': 105,
				'id': 'player',
				'isAlive': True,
				'pos': {
					'x': 0,
					'y': 1,
				},
				'body': [
					{'x': 0, 'y': 0},
					{'x': 0, 'y': 1},
				]
			},
			{
				'name': 'Bad',
				'hunger': 105,
				'id': '1',
				'isAlive': True,
				'pos': {
					'x': 5,
					'y': 6,
				},
				'body': [
					{'x': 5, 'y': 5},
					{'x': 5, 'y': 6},
				]
			},
		]
	}


def game_loop(state, session):
	if state == []: return
	
	update_snake_positions(state, session)
	update_snake_states(state, session)
	randomly_add_food(state)
	numSnakes = count_living_snakes(state)
	# snakes still isAlive
	return numSnakes

def update_snake_positions(state, session):
	for snake in state['snakes']:
		if snake['isAlive']:
			update_position(state, snake, session)


def update_position(state, snake, session):
	sid = snake['id']
	if sid == 'player':
		vel = get_player_velocity(snake, session)
	else:
		vel = get_ai_velocity(state, snake, session, sid)

	# Update position based on velocity
	snake['pos']['x'] += vel['x']
	snake['pos']['y'] += vel['y']

def get_player_velocity(player, session):
	if 'x' in session.keys() and 'y' in session.keys():
		xVel = session['x']
		yVel = session['y']
	else:
		xVel = 1
		yVel = 0
	return {'x': xVel, 'y': yVel}

def get_ai_velocity(state, snake, session, sid):
	pos = 'left' # Default value
	if sid == '0':
		pos = AlgorithmsHelper.bad_snake()
	elif sid == '1':
		pos = AlgorithmsHelper.random_snake(state, snake)
	return Directions.GetVelocityFromString(pos)
	
def update_snake_states(state, session):
	for snake in state['snakes']:
		if snake['isAlive'] == False:
			continue

		if is_snake_out_of_bounds(state, snake):
			logging.error("Snake out of bounds")
			snake['isAlive'] = False
			continue

		if is_snake_collided_self(state, snake):
			logging.error("Snake collided with itself")
			snake['isAlive'] = False
			continue

		if is_snake_collided_head(state, snake):
			logging.error("Head to head collision")
			snake['isAlive'] = False
			continue

		if is_snake_collided_other(state, snake):
			logging.error("Snake collided with another snake")
			snake['isAlive'] = False
			continue
		
		snake['hunger'] -= 0.5
		if is_snake_eating(state, snake):
			# Add one more tail positon
			snake['body'].append(snake['body'][-1])
			snake['hunger'] = 100
		
		if snake['hunger'] == 0:
			logging.error("Snake died of hunger")
			snake['isAlive'] = False
			continue

		# Snake still isAlive
		move_snake(state, snake)

def is_snake_out_of_bounds(state, snake):
	xOut = snake['pos']['x'] < 0 or snake['pos']['x'] >= state['width']
	yOut = snake['pos']['y'] < 0 or snake['pos']['y'] >= state['height']
	return xOut or yOut

def is_snake_collided_self(state, snake):
	for pos in snake['body']:
		if pos['x'] == snake['pos']['x'] and pos['y'] == snake['pos']['y']:
			return True
	
	return False

def is_snake_collided_head(state, snake):
	for otherSnake in state['snakes']:
		# Don't check dead snakes or self
		if not otherSnake['isAlive']: continue
		if otherSnake['name'] == snake['name'] and otherSnake['id'] == snake['id']: continue

		# Only check for the head
		if snake['pos'] == otherSnake['pos']:
			if len(snake['body']) < len(otherSnake['body']): return True

			# Both equal, also kill other snake
			elif len(snake['body']) < len(otherSnake['body']):
				otherSnake['isAlive'] = False
				return True

	return False

def is_snake_collided_other(state, snake):
	for otherSnake in state['snakes']:
		# Don't check dead snakes
		if not otherSnake['isAlive']: continue

		for pos in otherSnake['body']:
			if pos['x'] == snake['pos']['x'] and pos['y'] == snake['pos']['y']:
				return True

	return False

def is_snake_eating(state, snake):
	# Test if snake is on any food positon
	for i, foodPos in enumerate(state['food']):
		if foodPos['x'] == snake['pos']['x'] and foodPos['y'] == snake['pos']['y']:
			state['food'].pop(i)
			return True

	return False

# Adds the current pos to the body and pops the tail 
def move_snake(state, snake):
	snake['body'].append(snake['pos'].copy())
	snake['body'].pop(0)
	return 


# Add food based on the spawn rate or if enough turns have passed without food
def randomly_add_food(state):
	num = random.randint(1, 100)
	if (num <= state['spawn_rate']) or state['turns_since_food'] >= state['turns_till_food']:
		state['turns_since_food'] = 0
		newFoodPos = find_empty_position(state)
		if newFoodPos == {}: return
		state['food'].append(newFoodPos)
	else:
		state['turns_since_food'] += 1

# Build a list of all positions and remove occupied ones. Then return a random position from pool
def find_empty_position(state):
	# Get all possible positions
	positions = [{'x': x, 'y': y} for x in range(state['width']) for y in range(state['height'])]

	# Remove positions with other living snakes
	for snake in state['snakes']:
		if snake['isAlive'] == False: continue
		for pos in snake['body']:
			if pos in positions: positions.remove(pos)

	# Remove positions with food
	for pos in state['food']:
		if pos in positions: positions.remove(pos)

	# Return a random position of possible, else return empty list
	return random.choice(positions) if len(positions) > 0 else {}

def count_living_snakes(state):
	numLivingSnakes = 0
	for snake in state['snakes']:
		if snake['isAlive'] == True:
			numLivingSnakes += 1
	return numLivingSnakes

def set_winner(state):
	for snake in state['snakes']:
		if snake['isAlive'] == True:
			snake['isWinner'] = True