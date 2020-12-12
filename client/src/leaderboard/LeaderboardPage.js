import React from 'react';
import styled from 'styled-components';

const ShadedH1 = styled.h1`
	color: white;
	text-shadow: 1px 1px 20px #0072cf;
	text-align: center;
	font-size:75px
`

const LeaderboardPage = () => {
	return (
		<>
			<ShadedH1>The Leaderboard</ShadedH1>
		</>
	);
};

export default LeaderboardPage;
