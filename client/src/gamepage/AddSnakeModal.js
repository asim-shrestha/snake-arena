import React, { useState, useEffect } from 'react';
import AppModal from '../AppModal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const AddSnakeModal = ({ show, setShow, gameState, setGameState }) => {
	const [name, setName] = useState("");
	const [type, setType] = useState("0");
	const [alertText, setAlertText] = useState("");
	console.log(`name: "${name}", "${type}"`);

	useEffect(() => {
		// Reset values whenever show changes
		setName("")
		setType("0")
		setAlertText("")
	}, [show])

	const isSnakeNameAndTypeValid = () => {
		for (let snake of gameState.snakes) {
			// Test if adding more than one player snake
			if (snake.id === "player" && type === "player") {
				setAlertText("You cannot add more than 1 player controlled snake");
				return false;
			}

			// Test if adding snake with the same name
			if (snake.name === name) {
				setAlertText("You cannot add two snakes with the same name");
				return false;
			}
		}

		// Valid
		return true;
	}

	const isValidSnake = () => {
		if (gameState.snakes.length >= 4) {
			setAlertText("You cannot add more than 4 snakes");
			return false;
		}

		if (!isSnakeNameAndTypeValid()) {
			return false;
		}

		return true;
	}

	const getSnakePosition = () => {
		if (gameState.snakes.length === 0) { return {x: 0, y: 0}}
		else if (gameState.snakes.length === 1) { return {x: gameState.width - 1, y: 0}}
		else if (gameState.snakes.length === 2) { return {x: 0, y: gameState.height - 1}}
		return {x: gameState.width - 1, y: gameState.height - 1}
	}

	const addSnakeToGameState = () => {
		const newSnakes = [...gameState.snakes];
		newSnakes.push({
			name: name,
			id: type,
			hunger:100,
			body: [	getSnakePosition(), getSnakePosition() ]
		})
		
		setGameState({
			...gameState,
			snakes: newSnakes,
		})
		setShow(false);
	}

	const handleAddSnake = () => {
		if (!name || name === "") {
			setAlertText("Please add a name!")
			return;
		}

		if (isValidSnake()) {
			addSnakeToGameState()
		}
	};

	const addButtonData = {
		text: 'Add',
		onClick: handleAddSnake,
	};

	return (
		<AppModal
			show={show}
			setShow={setShow}
			title="Add snake 🐍"
			buttonData={addButtonData}
		>
			<Form>
				{
					alertText ? <Alert variant="warning">{alertText}</Alert> : ""
				}

				<Form.Group>
					<Form.Control type="text" size="lg" placeholder="Snake name" value={name} onChange={e => setName(e.target.value)}/>
					<br />
					<Form.Control as="select" size="lg" value={type} onChange={e => setType(e.target.value)}>
						<option value="0">Bad snake</option>
						<option value="1">Random snake</option>
						<option value="2">Hungry snake</option>
						<option value="3">Smart snake</option>
						<option value="player">Player controlled snake</option>
					</Form.Control>
				</Form.Group>
			</Form>
		</AppModal>
	);
};

export default AddSnakeModal;
