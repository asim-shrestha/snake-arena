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

const BlockButtonGroup = styled(ButtonGroup)`
	.btn {
		padding: .5rem 7em;
	}
`;

const socket = socketIOClient('ws://localhost:5000/', { forceNew: true, 'multiplex': false });
socket.on('connect', () => console.log("Concted to Sockets"));

const defaultGameState = {
	fps: 10,
	width: 10,
	height: 10,
	snakes: [],
	spawnRate: 5,
	isGameOver: true,
};

const GamePage = () => {
	const [gameState, setGameState] = useState({ ...defaultGameState });
	const [showAddSnakeModal, setShowAddSnakeModal] = useState(false);
	const [showPlayErrorModal, setShowPlayErrorModal] = useState(false);

	const leaveGame = () => {
			socket.emit('reset', () => {
				setGameState({ ...gameState, isGameOver: true });
			});
	}

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		// cleanup this component
		return () => {
			leaveGame();
			window.removeEventListener('keydown', handleKeyDown);
		};
	// eslint-disable-next-line
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
		leaveGame();
	};

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
