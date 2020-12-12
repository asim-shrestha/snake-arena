import React from 'react'
import Tile from './Tile'
import styled from 'styled-components'
import ShadedDiv from '../components/ShadedDiv'
import Scores from './Scores';

const GridBorder = styled(ShadedDiv)`
	background-color: white;
	padding: 2em;
	display: inline-flex;
`
const getTileType = (i, j, gameState) => {
	// Test for food
	if(gameState.food) {
		for (const coord of gameState.food) {
			const {x, y} = coord;
			if(x === j && y === i) {
				return {val: 'food'};
			}
		}
	}

	let res = null
	// Test for snakes
	// If we only find a dead snake, we keep searching for a live one
	// This is so live snakes draw on top of dead ones
	for (const snake of gameState.snakes) {
		for (const coord of snake.body) {
			const {x, y} = coord;
			if(x === j && y === i) {
				if (snake.isAlive) {
					return getSnakeTypeParams(snake, coord)
				} else {
					res = getSnakeTypeParams(snake, coord)
				}
			}
		}
	}
	
	return res
}

const getSnakeTypeParams = (snake, coord) => {
	return {
		val: 'snake',
		isAlive: snake.isAlive,
		dir: getDirection(snake.body, coord),
		isPlayer: snake.id === "player"
	}
}

const getDirection = (body, coord) => {
	if (!isHead(body, coord)) { return null; }
	const tail = body[body.length - 1]
	const beforeTail = body[body.length - 2]
	const vel = {x: tail.x - beforeTail.x, y: tail.y - beforeTail.y}

	// Get direction based on velocity
	if (vel.x === -1 && vel.y ===  0) { return 'left'; }
	else if (vel.x ===  0 && vel.y === -1) { return 'up'; }
	else if (vel.x ===  1 && vel.y ===  0) { return 'right'; }
	return 'down';
}

const isHead = (body, coord) => {
	const tail = body[body.length - 1]
	return (tail.x === coord.x && tail.y === coord.y)
}


const Grid = ({nRows, nCols, gameState, setGameState, handleAddSnake}) => {
	nCols = gameState.width;
	nRows = gameState.height;

	// Fill grid 
	const rows = []
	for(let i = 0; i < nRows; i++) {
		rows.push(
			<tr key={`${i}`}>
				{[...Array(nCols)].map((_, j) => <Tile key={`${i}, ${j}`} type={getTileType(i, j, gameState)}/>)}
			</tr>
		);
	}

	return (
		<GridBorder>
			<table>
				<tbody>
					{rows}
				</tbody>
			</table>
			<Scores
				snakes={gameState.snakes}
				gameState={gameState}
				setGameState={setGameState}
				handleAddSnake={handleAddSnake}
			/>
		</GridBorder>
	)
}

export default Grid
