import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import AppNavBar from './AppNavBar';
import GamePage from './gamepage/GamePage';
import LeaderboardPage from './leaderboard/LeaderboardPage';
import TutorialModal from './components/TutorialModal';

export const SIDE_PADDING = "10em";

const Page = styled.div`
	margin: 4em ${SIDE_PADDING};
	background-color: inherit;

	@media only screen and (max-width:1100px) {
		margin: 4em 2em;
	}
`;

function App() {
	const [showTutorial, setShowTutorial] = useState(true);

	return (
		<div className="App" style={{ backgroundColor: "#38a1f2" }}>
			<header className="App-header">
				<AppNavBar />
			</header>
			<TutorialModal show={showTutorial} setShow={setShowTutorial} />

			<Page>
				<Switch>
					<Route path="/leaderboard" exact component={LeaderboardPage} />
					<Route path="/" component={GamePage} />
				</Switch>
			</Page>
		</div>
	);
}

export default App;
