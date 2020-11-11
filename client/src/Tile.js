// import React from 'react'
import styled from 'styled-components';

const TileDiv = styled.div`
	background-color: #d9d9d9;
	border: 2px solid black;
	width: 20px;
	height: 20px;
`;

const Tile = () => {
	return (
		<td>
			<TileDiv/>
		</td>
	)
}

export default Tile
