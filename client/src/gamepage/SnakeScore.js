import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';

const SnakeScore = ({snake}) => {
	let {name, hunger, isWinner, isAlive} = snake;
	let medallion = '';
	let variant=''

	// Change markup based on state
	if (isWinner) {
		medallion = '👑';
		variant = 'warning' // Gold
	} else if (isAlive != null && !isAlive) {
		medallion = '💀';
		variant = 'danger'
	}

	// Cap hunger from 0 - 100
	if (hunger && hunger > 100) { hunger = 100; }
	if (hunger && hunger < 0) { hunger = 0; }

	// Remove bottom name margin if snake is dead to give room for death text
	const nameClass = snake.death ? "mb-0" : "";

	return (
		<>
			<h4 className={nameClass}>{name} ({Math.round(hunger) + "/100"}) {medallion}</h4>
			{snake.death ? <h6>{snake.death}</h6> : ""}
			<ProgressBar variant={variant} animated now={hunger} />
		</>
	)
}

export default SnakeScore
