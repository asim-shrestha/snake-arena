import React from 'react';
import Slider from './Slider';
import styled from 'styled-components';
import ShadedDiv from '../ShadedDiv';

const ConfigurationBoard = styled(ShadedDiv)`
	border-radius: 25px;
	background-color: white;
	padding: 1em;
	margin-left: 2em;
	min-width: 15em;
`;


const Configuration = ({ gameState, setGameState }) => {

	const updateGameState = (key, value) => {
		const newGameState = { ...gameState };
		newGameState[key] = value;
		setGameState(newGameState);
	};

	return (
		<ConfigurationBoard>
			<h2>Game Settings: </h2>
			<div className="m-3">
				<Slider disabled={!gameState.isGameOver} text="Speed (FPS)" min="7" max="15" value={gameState.fps} onChange={(e) => updateGameState('fps', parseInt(e.target.value))} />
				<Slider disabled={!gameState.isGameOver} text="Game Width" min="5" max="15" value={gameState.width} onChange={(e) => updateGameState('width', parseInt(e.target.value))} />
				<Slider disabled={!gameState.isGameOver} text="Game Height" min="5" max="15" value={gameState.height} onChange={(e) => updateGameState('height', parseInt(e.target.value))} />
				<Slider disabled={!gameState.isGameOver} text="Food Spawn Rate %" min="0" max="50" value={gameState.spawnRate} onChange={(e) => updateGameState('spawnRate', parseInt(e.target.value))} />
			</div>
		</ConfigurationBoard>
	);
};

export default Configuration;
