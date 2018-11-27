import React from "react";
import {connect} from "react-redux";
import "./style.scss";

import classNames from "classnames";

import {actions as projectActions} from "../../reducers/project";

import Request from "./Request";
import Response from "./Response";
import Decision from "./Decision";

const types = { request: Request, response: Response, decision: Decision };

/* -----------------    COMPONENT     ------------------ */

const Node = (props) => {
	const {node, selected, handleClick, locX, locY} = props;
    const SpecialNode = types[node.type || "response"];
	const CLASS_NAME = classNames("node-wrapper", `node-${node.type}`);
	const CONTAINER_CLASSES = classNames("node-container", {selected});

	console.log("LOC X", locX, "LOC Y", locY);

	return (
		<div className={CLASS_NAME} onClick={handleClick} style={{
			left: locX + "px",
			top: locY + "px"
		}}>
			<SpecialNode className={CONTAINER_CLASSES}
				{...props}
			/>
		</div>
	)
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({project}, {node}) => ({
	locX: node.loc.x,
	locY: node.loc.y,
	selected: node.id === project.selectedNodeId
});

const mapDispatch = (dispatch, {node}) => ({
	handleClick(evt) {
		evt.stopPropagation();
		dispatch(projectActions.selectNode({nodeId: node.id}));
	},
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
	},
	updateNode: (node) => dispatch(projectActions.updateNode(node))
});

export default connect(mapState, mapDispatch)(Node);
