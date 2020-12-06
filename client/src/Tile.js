// import React from 'react'
import styled from 'styled-components';

const TileDiv = styled.div`
	background-color: ${props => props.color};
	margin: 1px;
	width: 50px;
	height: 50px;

	// Below code with help from https://css-tricks.com/snippets/css/css-triangle/
	&.left {
		border-top: 25px solid ${props => props.color};
		border-bottom: 25px solid ${props => props.color};
		border-left: 15px solid #f1f1f1;
	}
	&.up {
		border-left: 25px solid ${props => props.color};
		border-right: 25px solid ${props => props.color};
		border-top: 15px solid #f1f1f1;
	}
	&.right {
		border-top: 25px solid ${props => props.color};
		border-bottom: 25px solid ${props => props.color};
		border-right: 15px solid #f1f1f1;
	}
	&.down {
		border-left: 25px solid ${props => props.color};
		border-right: 25px solid ${props => props.color};
		border-bottom: 15px solid #f1f1f1;
	}
	&:hover {
		border: 2px solid #38a1f2;
	}
`;

const Tile = ({type}) => {
	let color = "white"
	let dir = ''
	// Change color based on tile type
	if (!type || !type.val) { color = "#f1f1f1"} // Default to a wall
	else if (type.val === 'food') { color = "orange" }

	else if (type.val === 'snake') {
		color = type.isAlive ? "#38a1f2" : "#b2d2eb";
		dir = type.dir;
	}

	return (
		<td>
			<TileDiv className={dir} color={color}/>
		</td>
	)
}

export default Tile
