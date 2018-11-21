import React from "react";
import {connect} from "react-redux";
import "./style.scss";

import {actions as projectActions} from "../../../reducers/project";
import {advanceModalPhase} from "../../../reducers/ui";

import Line from "../Line";

/* -----------------    COMPONENT     ------------------ */

const Decision = ({handleClick}) => (
	<div className="decision-wrapper">
		<Line className="decision-line" />
		<div onClick={handleClick} className="decision" />
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
