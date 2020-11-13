// import React from 'react'
import styled from 'styled-components';

const TileDiv = styled.div`
	background-color: ${props => props.color};
	margin: 1px;
	width: 50px;
	height: 50px;
	&:hover {
		border: 2px solid #38a1f2;
  }
`;

const Tile = ({color}) => {
	// Default to a wall
	if (!color) { color = "#f1f1f1"}

	return (
		<td>
			<TileDiv color={color}/>
		</td>
	)
}

export default Tile
