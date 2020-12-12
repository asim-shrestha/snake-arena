import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Switch, Route, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import SnakeImage from './Snake.png';

const PaddedNavBar = styled(Navbar)`
	background-color: #0072cf;
	padding-left: 10em;
	padding-right: 10em;

	@media only screen and (max-width:678px) {
		padding-left: 2em;
		padding-right: 2em;
	}
`;

const AppNavBar = () => {
	return (
		<PaddedNavBar variant="dark">
			<Navbar.Brand>
				<img
					alt=""
					src={SnakeImage}
					width="50"
					height="30"
					className="d-inline-block align-top"
				/>{' '}
				Snake Arena
			</Navbar.Brand>
			<Navbar.Collapse className="justify-content-end">
				<Switch>
					<Route path="/leaderboard" exact>
						<Link to="/home"><Button variant="outline-light">Home</Button></Link>
					</Route>
					<Route path="/">
						<Link to="/leaderboard"><Button variant="outline-light">Leaderboard</Button></Link>
					</Route>
				</Switch>
			</Navbar.Collapse>
		</PaddedNavBar>
	);
};

export default AppNavBar;
