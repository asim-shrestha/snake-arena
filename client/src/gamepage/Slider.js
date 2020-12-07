import React from 'react';
import styled from 'styled-components';

// CSS from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_rangeslider
const Text = styled.h3`
	line-height: 2.5;
`;

const ValueText = styled.h5`
	line-height: 3.75;
	margin-right: 10px;
	margin-left: 15px;
`;

const CustomSlider = styled.input`
	height: 5em;
	fill: #FFFFFF;
	width: 100%;
`;

const Slider = ({ text, min, max, value, disabled, onChange }) => {

	return (
		<div>
			<div className="d-inline-flex w-100">
				<Text className="text-nowrap">{"•" + text}</Text>
				<ValueText>{min}</ValueText>
				<CustomSlider disabled={disabled} type="range" min={min} max={max} value={value} onChange={onChange} />
				<ValueText>{max}</ValueText>
			</div>
		</div>
	);
};

export default Slider;
