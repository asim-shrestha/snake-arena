import React from 'react'
import Tile from './Tile';
import styled from 'styled-components';

const GridBorder = styled.div`
	background-color: white;
	padding: 0.75em;
	box-shadow: 2px 3px 8px 5px #888888;
`

const Grid = ({nRows, nCols}) => {
	const rows = []
	for(let i = 0; i < nRows; i++) {
		rows.push(
			<tr key={`${i}`}>
				{[...Array(nCols)].map((e, j) => <Tile/>)}
			</tr>
		);
	}

	return (
		<table>
			<GridBorder>
			{rows}
			</GridBorder>
		</table>
	)
}

export default Grid
