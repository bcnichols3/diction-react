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
			className="input file-input"
			multiple={false}
			inputProps={{ accept: ".json" }}
		/>
	</Modal>
)

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ui}) => ({
	phase: ui.modalPhases.uploadProject
});

const mapDispatch = {
	advanceModalPhase,
	receiveProject: projectActions.receiveProject
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const {phase} = stateProps;
	const {advanceModalPhase, receiveProject} = dispatchProps;
	return {
		...stateProps,
		...dispatchProps,
		...ownProps,
		handleDrop(acceptedFiles, rejectedFiles) {
			const reader = new FileReader();
			reader.onload = (evt) => {
				const project = JSON.parse(evt.target.result);
				advanceModalPhase({name, delay, phase});
				receiveProject(project);
			};
			reader.readAsText(acceptedFiles[0]);
		}
	}
}

export default connect(mapState, mapDispatch, mergeProps)(NewConnectionModal)
