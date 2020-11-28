import React from 'react'
import Slider from './Slider';
import styled from 'styled-components';
import ShadedDiv from './ShadedDiv';

const ConfigurationBoard = styled(ShadedDiv)`
	border-radius: 25px;
	background-color: white;
	padding: 1em;
	margin-left: 2em;
	min-width: 15em;
`


const Configuration = () => {
	return (
		<ConfigurationBoard>
			<h2>Game Settings: </h2>
			<div className="m-3">
				<Slider text="Speed (FPS)" min="1" max="15"/>
				<Slider text="Game Width" min="5" max="10"/>
				<Slider text="Game Height" min="5" max="10"/>
			</div>
		</ConfigurationBoard>
	)
}

export default Configuration
