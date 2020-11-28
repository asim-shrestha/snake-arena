import React, {useState, useEffect} from 'react';
import Grid from './Grid';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import socketIOClient  from "socket.io-client";
import ShadedDiv from './ShadedDiv'
import Configuration from './Configuration'

const CenteredDiv = styled.div`
	display: flex;
	justify-content:center;
	margin: 2em;
`;

const ShadedText = styled.h1`
	color: white;
	text-shadow: 1px 1px 10px #0072cf;
`

const BlockButtonGroup = styled(ButtonGroup)`
	.btn {
		padding: .5rem 7em;
	}
`

const socket = socketIOClient('ws://localhost:5000/', { forceNew:true, 'multiplex':false })
socket.on('connect', () => console.log("COONECTED BOYE"))


const GamePage = () => {
	const [gameState, setGameState] = useState({
		width: 10,
		height: 10,
	});

	useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    // cleanup this component
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
	}, []);
	
	const handlePlay = () => {
		socket.emit('start_game', {width: gameState.width, height: gameState.height});
		socket.on('game_state', (data) => {
			setGameState(data);
		})
		socket.on('game_over', (data) => {
			// Handle game over
		})
	}

	const handleKeyDown = (e) => {
		e.preventDefault();
		console.log(e.keyCode);
		if(e.keyCode >= 37 && e.keyCode <= 40) {
			socket.emit('keydown', e.keyCode);
		}
	}

	return (
		<div style={{ display: "block" }}>
			<CenteredDiv>
				<Grid nRows={5} nCols={5} gameState={gameState}/>
			</CenteredDiv>
			<CenteredDiv>
				<ShadedDiv>
					<BlockButtonGroup size="lg">
						<Button variant="light" onClick={handlePlay}>Play</Button>
						<Button variant="dark">Reset</Button>
					</BlockButtonGroup>
				</ShadedDiv>
			</CenteredDiv>
			{/* <ShadedText>Configuration</ShadedText> */}
			<Configuration/>
		</div>
	);
};

export default GamePage;
