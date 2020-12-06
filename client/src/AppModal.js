import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const AppModal = ({show, setShow, title, buttonData, children}) => {
	const closeModal = () => setShow(false);
	return (
		<Modal
			show={show}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			
		>
			<Modal.Header closeButton onClick={closeModal}>
				<Modal.Title id="contained-modal-title-vcenter">
					{title}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{children}
			</Modal.Body>
			<Modal.Footer>
				{
					buttonData ?
					<Button onClick={buttonData.onClick}>{buttonData.text}</Button> : "" 
				}
				<Button onClick={closeModal}>Close</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default AppModal
