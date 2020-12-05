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
	} else if (isAlive != undefined && !isAlive) {
		medallion = '💀';
		variant = 'danger'
	}

	// Cap hunger to 100
	if (hunger && hunger > 100) { hunger = 100; }

	return (
		<>
			<h4>{name} ({Math.round(hunger) + "/100"}) {medallion}</h4>
			<ProgressBar variant={variant} animated now={hunger} />
		</>
	)
}

export default SnakeScore
