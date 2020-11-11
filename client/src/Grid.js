import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tile from './Tile';
import styled from 'styled-components';

const GameGrid = styled.div`
	display: grid;
	grid-template-columns: 120px 120px 120px 
	grid-template-rows: 120px 120px 120px 20px;
	justify-content: center;
 `;

const Grid = ({nRows, nCols}) => {
	// const rows = []
	// for(let i = 0; i < nRows; i++) {
	// 	rows.push(
	// 		<Row key={i}>
	// 			{[...Array(nCols)].map((e, j) => <Col key={i + j}><Tile/></Col>)}
	// 		</Row>
	// 	);
	// }

	return (
		<GameGrid>
			<Tile><Tile/> </Tile>
			<Tile/> <Tile/>
			<Tile/>
			<Tile/>
			<Tile/>
			<Tile/>
			<Tile/>
			<Tile/>
			<Tile/>
			<Tile/>
			<Tile/>
			<Tile/>
			<Tile/>
			<Tile/>
			<Tile/>
		</GameGrid>
	)
}

export default Grid
