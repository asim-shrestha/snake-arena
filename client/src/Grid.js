import React from 'react'
import Tile from './Tile'
import styled from 'styled-components'
import ShadedDiv from './ShadedDiv'

const GridBorder = styled(ShadedDiv)`
	background-color: white;
	padding: 2em;
	display: inline-block;
`
const getTileColor = (i, j, gameState) => {
	const color = null
	// Test for player
	if(gameState.player) {
		for (const coord of gameState.player.body) {
			const {x, y} = coord;
			if(x === j && y === i) {
				return 'black';
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
	console.log(gameState)
	// Fill background
	const rows = []
	for(let i = 0; i < nRows; i++) {
		rows.push(
			<tr key={`${i}`}>
				{[...Array(nCols)].map((e, j) => <Tile key={`${i}, ${j}`} color={getTileColor(i, j, gameState)}/>)}
			</tr>
		);
	}
	
	// // Fill player
	// if(gameState.player) {
	// 	for (const coord of gameState.player.body) {
	// 		const {x, y} = coord;
	// 		console.log(rows[y])
	// 		rows[x][y] = <Tile key={`${x}, ${x}`}/>
	// 	}
	// }

	return (
		<GridBorder>
			<table>
				<tbody>
					{rows}
				</tbody>
			</table>
		</GridBorder>
	)
}

export default Grid
