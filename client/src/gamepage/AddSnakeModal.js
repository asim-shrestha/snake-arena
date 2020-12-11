import React, { useState, useEffect } from 'react';
import AppModal from '../AppModal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const AddSnakeModal = ({ show, setShow, gameState, setGameState }) => {
	const [name, setName] = useState("");
	const [type, setType] = useState("");
	const [foodW, setFoodW] = useState("");
	const [emptyW, setEmptyW] = useState("");
	const [avoidW, setAvoidW] = useState("");
	const [alertText, setAlertText] = useState("");
	const [addedSnakeName, setAddedSnakeName] = useState("");
	console.log(`name: "${name}", "${type}"`);

	const resetValues = () => {
		setName("");
		setType("1");
		setAlertText("");
		setAddedSnakeName("");
		setFoodW("");
		setEmptyW("");
		setAvoidW("");
	};

	useEffect(() => {
		// Reset values whenever show changes
		resetValues();
	}, [show]);

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
	};

	const isValidSnake = () => {
		if (gameState.snakes.length >= 4) {
			setAlertText("You cannot add more than 4 snakes");
			return false;
		}

		if (!isSnakeNameAndTypeValid()) {
			return false;
		}

		return true;
	};

	// Place snake in corners
	const getSnakePosition = () => {
		if (gameState.snakes.length === 0) { return { x: 3, y: 3 }; }
		else if (gameState.snakes.length === 1) { return { x: gameState.width - 4, y: 3 }; }
		else if (gameState.snakes.length === 2) { return { x: 3, y: gameState.height - 4 }; }
		return { x: gameState.width - 4, y: gameState.height - 4 };
	};

	const addSnakeToGameState = () => {
		const newSnakes = [...gameState.snakes];
		newSnakes.push({
			name: name,
			id: type,
			hunger: 100,
			body: [getSnakePosition(), getSnakePosition()],
			weights: foodW + ',' + emptyW + ',' + avoidW,
		});

		setGameState({
			...gameState,
			snakes: newSnakes,
		});
	};

	const handleAddSnake = () => {
		setAddedSnakeName("");
		if (!name || name === "") {
			setAlertText("Please add a name!");
			return;
		}
		
		if (type === "3") {
			if (!foodW || !emptyW || !avoidW) {
				setAlertText("Please fill smart snake fields!");
				return;
			}
		}
		if (isValidSnake()) {
			const snakeName = name;
			addSnakeToGameState();
			setName("")
			setAlertText("")
			setAddedSnakeName(snakeName);
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
				{ addedSnakeName ? <Alert variant="success">Snake "{addedSnakeName}" successfully added</Alert> : "" }
				{ alertText ? <Alert variant="warning">{alertText}</Alert> : "" }

				<Form.Group>
					<Form.Control type="text" size="lg" placeholder="Snake name" value={name} onChange={e => setName(e.target.value)} />
					<br />
					<Form.Control as="select" size="lg" value={type} onChange={e => setType(e.target.value)}>
						<option value="1">Random snake</option>
						<option value="2">Hungry snake</option>
						<option value="3">Smart snake</option>
						<option value="player">Player controlled snake</option>
					</Form.Control>
				</Form.Group>
				{
					type === "3" ? 
					<Form.Group>
					<br />
					<Form.Control type="number" size="lg" placeholder="Food weight" value={foodW} onChange={e => setFoodW(e.target.value)} />
					<br />
					<Form.Control type="number" size="lg" placeholder="Empty space weight" value={emptyW} onChange={e => setEmptyW(e.target.value)} />
					<br />
					<Form.Control type="number" size="lg" placeholder="Snake avoidance weight" value={avoidW} onChange={e => setAvoidW(e.target.value)} />
				</Form.Group> : ""
				}
			</Form>
		</AppModal>
	);
};

export default AddSnakeModal;
