import React, {useState} from 'react';
import styled from 'styled-components'

// CSS from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_rangeslider
const CustomSlider = styled.input`
	height: 5em;
	fill: #FFFFFF;
	width: 100%;
`

const Slider = ({text, min, max, value, onChange}) => {

	return (
		<div>
			<div className="d-inline-flex w-100">
					<h3 className=" text-nowrap">{"•" + text}</h3>
					<CustomSlider type="range" min={min} max={max} value={value} onChange={onChange}/>
			</div>
		</div>
	)
}

export default Slider
