import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Grid = ({nRows, nCols}) => {
	return (
		<Container>
			<Row>
				{ [...Array(nCols)].map((e, i) => <Col key={i}>Test</Col>)}
			</Row>
		</Container>
	)
}

export default Grid
