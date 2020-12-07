import React, { useState, useEffect } from 'react';
import Grid from './Grid';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import socketIOClient from "socket.io-client";
import ShadedDiv from '../ShadedDiv';
import Configuration from './Configuration';
import AddSnakeModal from './AddSnakeModal';
import PlayErrorModal from '../PlayErrorModal';

const CenteredDiv = styled.div`
	display: flex;
	justify-content:center;
	margin: 2em;
`;

// TODO DELETE
// const ShadedText = styled.h1`
// 	color: white;
// 	text-shadow: 1px 1px 10px #0072cf;
// `

const BlockButtonGroup = styled(ButtonGroup)`
	.btn {
		padding: .5rem 7em;
	}
`;

const socket = socketIOClient('ws://localhost:5000/', { forceNew: true, 'multiplex': false });
socket.on('connect', () => console.log("COONECTED BOYE"));

const defaultGameState = {
	fps: 10,
	width: 10,
	height: 10,
	snakes: [],
	spawnRate: 5,
	isGameOver: true,
}

const GamePage = () => {
	const [gameState, setGameState] = useState({...defaultGameState});
	const [showAddSnakeModal, setShowAddSnakeModal] = useState(false);
	const [showPlayErrorModal, setShowPlayErrorModal] = useState(false);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		// cleanup this component
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	const handlePlay = () => {
		// Don't play if too few snakes
		if (gameState.snakes.length <= 0) {
			setShowPlayErrorModal(true);
			return;
		}

		// Start the game
		socket.emit('start_game', gameState);
		socket.on('game_state', (data) => {
			setGameState(data);
		});
		socket.on('game_over', (data) => {
			// Handle game over
			setGameState(data);
		});
	};

	const handleEndGame = () => {
		// Check if we need to leave from the server
		if (!gameState.isGameOver) {
			socket.emit('reset');
		}
	}

	const handleKeyDown = (e) => {
		if (e.keyCode >= 37 && e.keyCode <= 40) {
			e.preventDefault();
			socket.emit('keydown', e.keyCode);
		}
	};

	return (
		<div style={{ display: "block" }}>
			<CenteredDiv>
				<Grid nRows={5} nCols={5} gameState={gameState} setGameState={setGameState} handleAddSnake={() => setShowAddSnakeModal(true)} />
			</CenteredDiv>

			<CenteredDiv>
				<ShadedDiv>
					<BlockButtonGroup size="lg">
						<Button disabled={!gameState.isGameOver} variant="light" onClick={handlePlay}>Play</Button>
						<Button disabled={gameState.isGameOver} variant="dark" onClick={handleEndGame}>End Game</Button>
					</BlockButtonGroup>
				</ShadedDiv>
			</CenteredDiv>
			<Configuration
				gameState={gameState}
				setGameState={setGameState}
			/>
			<AddSnakeModal
				show={showAddSnakeModal}
				setShow={setShowAddSnakeModal}
				gameState={gameState}
				setGameState={setGameState}
			/>
			<PlayErrorModal
				show={showPlayErrorModal}
				setShow={setShowPlayErrorModal}
			/>
		</div>
	);
};

export default GamePage;
