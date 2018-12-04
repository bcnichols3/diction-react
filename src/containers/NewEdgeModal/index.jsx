import React from "react";
import {connect} from "react-redux";

import Modal from "../../presenters/Modal";

import {actions as projectActions} from "../../reducers/project";
import {advanceModalPhase} from "../../reducers/ui";

const delay = 200;
const name = "newEdge"

/* -----------------    COMPONENT     ------------------ */

const NewEdgeModal = ({project, phase, handleConnClick}) => (
	<Modal name={name} delay={delay} phase={phase}>
		<h3>Add</h3>
		<button onClick={handleConnClick}>
			Node
		</button>
	</Modal>
)

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ui}) => ({
	phase: ui.modalPhases.newEdge
});

const mapDispatch = {
	advanceModalPhase,
	createNode: projectActions.createNode
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const {phase} = stateProps;
	const {advanceModalPhase, createNode} = dispatchProps;
	return {
		...stateProps,
		...dispatchProps,
		...ownProps,
		handleConnClick(evt) {
			advanceModalPhase({name, delay, phase});
			createNode();
		}
	}
}


export default connect(mapState, mapDispatch, mergeProps)(NewEdgeModal)
