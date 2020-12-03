import logging
import random

def create_game_state(width, height):
	return {
		'width': width,
		'height': height,
		'spawn_rate': 2,
		'turns_till_food': 50,
		'turns_since_food': 0,
		'player': {
			'pos': {
				'x': 0,
				'y': 1,
			},
			'body': [
				{'x': 0, 'y': 0},
				{'x': 0, 'y': 1},
			]
		},
		'food': [
			{'x': 3, 'y': 3},
			{'x': 4, 'y': 4},
		],
		'snakes': {
			'id': 1,
			'body': [
				{'x': 0, 'y': 0},
				{'x': 0, 'y': 1},
			]
		}
	}

def game_loop(state, session):
	if state == []: return

	# Update player position
	player = state['player']
	update_position(player, session)

	if is_snake_out_of_bounds(state, player):
		logging.error("snake out of bounds")
		return 0

	if is_snake_collided_self(state, player):
		logging.error("snake collided with self")
		return 0

	if is_snake_eating(state, player):
		# Add one more tail positon
		player['body'].append(player['body'][-1])
	
	move_snake(state, player)

	add_food(state, player)

	# Player still alive
	return 1

def update_position(player, session):
	if 'x' in session.keys() and 'y' in session.keys():
		xVel = session['x']
		yVel = session['y']
	else:
		xVel = 1
		yVel = 0
	
	player['pos']['x'] += xVel
	player['pos']['y'] += yVel

def is_snake_out_of_bounds(state, snake):
	xOut = snake['pos']['x'] < 0 or snake['pos']['x'] >= state['width']
	yOut = snake['pos']['y'] < 0 or snake['pos']['y'] >= state['height']
	return xOut or yOut

def is_snake_collided_self(state, snake):
	for pos in snake['body']:
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

def move_snake(state, snake):
	snake['body'].append(snake['pos'].copy())
	snake['body'].pop(0)
	return 

# Add food based on the spawn rate or if enough turns have passed without food
def add_food(state, snake):
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

	# Remove positions with the player
	for pos in state['player']['body']:
		if pos in positions: positions.remove(pos)

	# Remove positions with food
	for pos in state['food']:
		if pos in positions: positions.remove(pos)

	# Return a random position of possible, else return empty list
	return random.choice(positions) if len(positions) > 0 else {}
