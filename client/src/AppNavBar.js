import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import styled from 'styled-components'
import SnakeImage from './Snake.png'

const PaddedNavBar = styled(Navbar)`
	background-color: #0072cf;
	padding-left: 10em;
	padding-right: 10em;
`

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
		</PaddedNavBar>
	)
}

export default AppNavBar
