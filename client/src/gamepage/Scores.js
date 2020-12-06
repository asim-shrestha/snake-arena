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

const GroundedButton = styled(Button)`
	position: absolute;
	bottom: 0;
	width: 95%;
`

const Scores = ({snakes, handleAddSnake}) => {
	if (snakes == null) {
		snakes = [];
	}
console.log(snakes)
	return (
		<ScoreBoard>
			<h2>Snakes:</h2>
			{
				snakes.map((snake, i) => 
					<SnakeScore id={i + String(snake.name)} snake={snake}/>
				)
			}
			{
				// Display message if no snakes
				snakes.length === 0 ? <h4 className="text-secondary">Add snakes to start!</h4> : ""
			}
			<GroundedButton onClick={handleAddSnake}>Add Snake</GroundedButton>
		</ScoreBoard>
	)
}

export default Scores
