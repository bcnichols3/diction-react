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

const mapDispatch = (dispatch, {phase}) => ({
	handleConnClick(evt) {
		dispatch(advanceModalPhase({name, delay, phase}))
		dispatch(projectActions.createNode())
	}
});


export default connect(null, mapDispatch)(NewEdgeModal)
