import React from 'react'
import Slider from './Slider';
import styled from 'styled-components';
import ShadedDiv from './ShadedDiv';

const ConfigurationBoard = styled(ShadedDiv)`
	background-color: white;
	padding: 1em;
	margin-left: 2em;
	min-width: 15em;
`


const Configuration = () => {
	return (
		<ConfigurationBoard>
			<Slider text="Hello" min="0" max="100"/>
		</ConfigurationBoard>
	)
}

export default Configuration
