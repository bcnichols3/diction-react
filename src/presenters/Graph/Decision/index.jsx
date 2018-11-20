import React from "react";
import {connect} from "react-redux";
import "./style.scss";

import {actions as projectActions} from "../../../reducers/project";
import {advanceModalPhase} from "../../../reducers/ui";

/* -----------------    COMPONENT     ------------------ */

const Decision = ({handleClick}) => (
	<div className="decision-wrapper">
		<div className="decision-line decision-orig-line" />
		<button onClick={handleClick} className="decision">
			+
		</button>
	</div>
);

/* -----------------    CONTAINER     ------------------ */

const mapDispatch = (dispatch, {node}) => ({
	handleClick: (evt) => {
		dispatch(projectActions.selectNode({nodeId: node.id}))
		dispatch(advanceModalPhase({
			name: "newConnection",
			phase: "closed"
		}));
	}
})

export default connect(null, mapDispatch)(Decision)
