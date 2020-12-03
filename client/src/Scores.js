import React from 'react';
import Button from 'react-bootstrap/Button'
import styled from 'styled-components';
import SnakeScore from './SnakeScore';

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

const Scores = () => {
	return (
		<ScoreBoard>
			<h2>Snakes:</h2>
			<SnakeScore name="Asim" hunger={45} isWinner={true} isDead={true}/>
			<SnakeScore name="Fake" hunger={10} isWinner={false} isDead={false}/>
			<GroundedDiv>Add Snake</GroundedDiv>
		</ScoreBoard>
	)
}

export default Scores
