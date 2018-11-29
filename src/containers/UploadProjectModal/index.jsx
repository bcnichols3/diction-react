import React from "react";
import {connect} from "react-redux";

import {actions as projectActions} from "../../reducers/project";
import {advanceModalPhase} from "../../reducers/ui";

import Modal from "../../presenters/Modal";

import Dropzone from "react-dropzone";

const delay = 200;
const name = "uploadProject"

/* -----------------    COMPONENT     ------------------ */

const NewConnectionModal = ({project, phase, handleDrop}) => (
	<Modal name={name} delay={delay} phase={phase}>
		<h3>Upload your project</h3>
		<Dropzone onDrop={handleDrop}
			multiple={false}
			inputProps={{ accept: ".json" }}/>
	</Modal>
)

/* -----------------    CONTAINER     ------------------ */

const mapDispatch = (dispatch, {phase}) => ({
	handleDrop(acceptedFiles, rejectedFiles) {
		const reader = new FileReader();
		reader.onload = (evt) => {
			const project = JSON.parse(evt.target.result);
			dispatch(advanceModalPhase({name, delay, phase}));
			dispatch(projectActions.receiveProject(project));
		};
		reader.readAsText(acceptedFiles[0]);
	}
});


export default connect(null, mapDispatch)(NewConnectionModal)
