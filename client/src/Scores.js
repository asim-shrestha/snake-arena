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

const Scores = ({snakes}) => {
	if (snakes == null) {
		snakes = [];
	}
console.log(snakes)
	return (
		<ScoreBoard>
			<h2>Snakes:</h2>
			{
				snakes.map((snake, i) => 
					<SnakeScore id={i} snake={snake}/>
				)
			}
	
			<GroundedDiv>Add Snake</GroundedDiv>
		</ScoreBoard>
	)
}

export default Scores
