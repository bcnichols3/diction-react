import React from "react";
import {connect} from "react-redux";
import "./style.scss";

import {actions as projectActions} from "../../../reducers/project";

import Line from "../Line";

/* -----------------    COMPONENT     ------------------ */

const Edge = ({origId, destId, label, handleChange}) => (
	<div className="node-connection">
		<Line className="connection-line"/>
		<input
			className="connection-label"
			value={label}
			onChange={handleChange}/>
	</div>
)

/* -----------------    CONTAINER     ------------------ */

const mapDispatch = (dispatch, {origId, destId}) => ({
	handleChange(evt) {
		dispatch(projectActions.updateEdge({
			origId,
			destId,
			label: evt.target.value
		}));
	}
})

export default connect(null, mapDispatch)(Edge)
