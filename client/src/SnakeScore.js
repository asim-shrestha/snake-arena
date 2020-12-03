import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';

const SnakeScore = ({name, hunger, isWinner, isDead}) => {
	let medallion = '';
	let variant=''

	// Change markup based on state
	if (isWinner) {
		medallion = '👑';
		variant = 'warning' // Gold
	} else if (isDead) {
		medallion = '💀';
		variant = 'danger'
	}

	// Chaange colour based on state

	return (
		<>
			<h4>{name} ({hunger + "/100"}) {medallion}</h4>
			<ProgressBar variant={variant} animated now={hunger} />
		</>
	)
}

export default SnakeScore
