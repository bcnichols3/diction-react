import React from "react";
import {connect} from "react-redux";

import {actions as projectActions} from '../../../reducers/project';

import Request from "./Request";
import Response from "./Response";

const types = { request: Request, response: Response };

/* -----------------    COMPONENT     ------------------ */

const Node = (props) => {
    const Node = types[props.type || "response"];
	return (
		<div className="node-wrapper">
			<Node {...props} />
		</div>
	)
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({project}, {nodeId}) => ({
	node: project.nodesById[nodeId],
	edges: project.edges[nodeId],
	allConnectedNodeIds: Object.keys(project.edges[nodeId] || {})
});

const mapDispatch = (dispatch, {node}) => ({
	handleChange(evt) {
		const {classList, value} = evt.target;
		const CLASSES = Array.from(classList);
		let key = "name";
		if (CLASSES.includes("node-speech")) key = "speech";
		if (CLASSES.includes("node-reprompt")) key = "reprompt"

		const editedNode = Object.assign({}, node, {
			[key]: value
		});

		dispatch(projectActions.updateNode(editedNode));
	}
});

export default connect(mapState, mapDispatch)(Node);
