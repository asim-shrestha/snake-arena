import React from 'react'
import Tile from './Tile'
import styled from 'styled-components'
import ShadedDiv from './ShadedDiv'
import Scores from './Scores';

const GridBorder = styled(ShadedDiv)`
	background-color: white;
	padding: 2em;
	display: inline-flex;
`
const getTileColor = (i, j, gameState) => {
	const color = null
	// Test for player
	for (const snake of gameState.snakes) {
		for (const coord of snake.body) {
			const {x, y} = coord;
			if(x === j && y === i) {
				return '#38a1f2';
			}
		}
	}

	// Test for food
	if(gameState.food) {
		for (const coord of gameState.food) {
			const {x, y} = coord;
			if(x === j && y === i) {
				return 'orange';
			}
		}
	}
	
	return color
}

const Grid = ({nRows, nCols, gameState}) => {
	nCols = gameState.width;
	nRows = gameState.height;

	// Fill grid 
	const rows = []
	for(let i = 0; i < nRows; i++) {
		rows.push(
			<tr key={`${i}`}>
				{[...Array(nCols)].map((e, j) => <Tile key={`${i}, ${j}`} color={getTileColor(i, j, gameState)}/>)}
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
			<Scores/>
		</GridBorder>
	)
}

export default Grid
