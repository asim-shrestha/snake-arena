import React from 'react';
import AppModal from './AppModal';

const PlayErrorModal = ({ show, setShow }) => {
	return (
		<AppModal
			show={show}
			setShow={setShow}
			title="⚠️ Error attempting to play! ⚠️"
		>
			<p>You must add at least one snake to play 🐍</p>
		</AppModal>
	);
};

export default PlayErrorModal;
