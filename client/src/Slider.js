import React, {useState} from 'react';
import styled from 'styled-components'

// CSS from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_rangeslider
const CustomSlider = styled.input`
	width: 100%;
	height: 5em;
	fill: #FFFFFF;
`

const Slider = ({min, max, onChange}) => {
	const [value, setValue] = useState(50)
	// handleOnChange = (e) = {
	// 	output.innerHTML = this.value;
	// }

	return (
		<CustomSlider type="range" min={min} max={max} value={value} onChange={e => setValue(e.target.value)}/>
	)
}

export default Slider
