import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';

const SnakeScore = ({ snake, deleteDisabled, deleteSnake }) => {
	let { name, hunger, isWinner, isAlive } = snake;
	let medallion = '';
	let variant = '';

	// Change markup based on state
	if (isWinner) {
		medallion = '👑';
		variant = 'warning'; // Gold
	} else if (isAlive != null && !isAlive) {
		medallion = '💀';
		variant = 'danger';
	}


	// Cap hunger from 0 - 100
	if (hunger && hunger >= 100) { hunger = 99; }
	if (hunger && hunger < 0) { hunger = 0; }
	hunger = Math.round(hunger);

	// Pad value so that the score doesn't jitter
	hunger = hunger.toString().padStart(3 - hunger.toString().length, '0');

	// Remove bottom name margin if snake is dead to give room for death text
	const nameClass = snake.death ? "mb-0" : "mb-2";

	return (
		<>
			<div className={nameClass + " mt-2"}>
				<h4 className={"d-inline"}>{name} ({hunger + "/100"}) {medallion}</h4>
				<Button disabled={deleteDisabled} className="float-right close" variant="light" size="sm" onClick={deleteSnake}>
					<h4 className="mb-0">❌</h4>
				</Button>
			</div>

			{snake.death ? <h6>{snake.death}</h6> : ""}
			<ProgressBar variant={variant} animated now={hunger} />
		</>
	);
};

export default SnakeScore;
