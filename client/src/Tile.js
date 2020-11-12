// import React from 'react'
import styled from 'styled-components';

const TileDiv = styled.div`
	background-color: #f1f1f1;
	margin: 1px;
	width: 50px;
	height: 50px;
	&:hover {
		border: 2px solid #38a1f2;
  }
`;

const Tile = () => {
	return (
		<td>
			<TileDiv/>
		</td>
	)
}

export default Tile
