import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button'
import styled from 'styled-components';

const ScoreBoard = styled.div`
	margin: 1em;
	position: relative;
	background-color: white;
	padding: 1em;
	min-width: 15em;
`

const GroundedDiv = styled(Button)`
	position: absolute;
	bottom: 0;
	width: 95%;
`

const Scores = ({nRows, nCols}) => {
	return (
		<ScoreBoard>
			<h2>Snakes:</h2>
			<h4>Asim ({"45/100"})</h4>
			<ProgressBar animated now={45} />
			<h4>Snake 2</h4>
			<ProgressBar animated now={10} />
			<GroundedDiv>Add Snake</GroundedDiv>
		</ScoreBoard>
	)
}

export default Scores
