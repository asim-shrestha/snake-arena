import React from 'react';
import styled from 'styled-components';
import Leaderboard from './Leaderboard';

const ShadedH1 = styled.h1`
	color: white;
	text-shadow: 1px 1px 20px #0072cf;
	text-align: center;
`

const LeaderboardPage = () => {
	return (
		<>
			<ShadedH1 style={{fontSize: "75px"}}>The Leaderboard</ShadedH1>
			<ShadedH1>Sorted by Wins</ShadedH1>
			<Leaderboard/>
		</>
	);
};

export default LeaderboardPage;
