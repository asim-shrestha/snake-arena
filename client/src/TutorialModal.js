import React from 'react'
import AppModal from './AppModal'

const TutorialModal = ({show, setShow}) => {
	return (
		<AppModal
			show={show}
			setShow={setShow}
			title="Welcome to the Snake Arena! 👋"
		>
			<p>Follow along with this tutorial!</p>
		</AppModal>
	)
}

export default TutorialModal
