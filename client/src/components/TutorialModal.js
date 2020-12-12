import React from 'react';
import AppModal from './AppModal';

const TutorialModal = ({ show, setShow }) => {
	return (
		<AppModal
			show={show}
			setShow={setShow}
			title="Welcome to the Snake Arena! 👋"
		>
			<h5>Intro</h5>
			<p>
				The following is a quick tutorial to get you started with how to use this web app!
				Feel free to close this if you are already familiar.
				The site consists of two pages which can be navigated through the dynamic button at the top right of the page.
			</p>
			<h5>The Arena</h5>
			<p>
				The first page is the game / home page where the game is played.
				The game is both singleplayer and multiplayer (against AI). In both settings, your aim is to survive the longest.
				The score on the right of the board represents the snake's hunger. Once a snake's hunger reaches 0, it dies.
				Eating food replenishes hunger and extends your snake.
				There are a number of snake types thats you can pick from:
				A randomly moving snake, a hungry snake that moves to the closest food, a player controlled snake that is moved with the arrow keys, and a smart snake.
				Finally, you can tweak game settings at the bottom of the page.
				NOTE: For clarity, the player snake is coloured red. Also note, settings cannot be tweaked in game.
			</p>
			<h5>The Smart Snake</h5>
			<p>
				The smart snake is the coolest of the bunch and allows you to tweak exactly how the snake's "brain" operates.
				This is done through editing the weight value options that pop up when you select the snake.
				The higher the weight, the more the snake will prioritize moves that either provide food (food weight),
				provide greater free space (empty space weight), or avoids other snakes (snake avoidance weight).
			</p>
			<h5>Leaderboards</h5>
			<p>
				The leaderboard page shows the stats of PLAYER controlled snakes.
				Stats are tied to what name is provided for PLAYER controlled snakes in game and is not tied to any account.
				Play some games against the AI yourself to get on the leaderboard!
				Note that single player games do not count towards the leaderboard.
			</p>
		</AppModal>
	);
};

export default TutorialModal;
