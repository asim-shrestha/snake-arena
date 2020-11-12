import React from 'react'
import Tile from './Tile'
import styled from 'styled-components'
import ShadedDiv from './ShadedDiv'

const GridBorder = styled(ShadedDiv)`
	background-color: white;
	padding: 2em;
	display: inline-block;
`

const Grid = ({nRows, nCols}) => {
	const rows = []
	for(let i = 0; i < nRows; i++) {
		rows.push(
			<tr key={`${i}`}>
				{[...Array(nCols)].map((e, j) => <Tile key={`${i}, ${j}`}/>)}
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
		</GridBorder>
	)
}

export default Grid
