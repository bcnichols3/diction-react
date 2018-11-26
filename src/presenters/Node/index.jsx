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
	const {node, selected, handleClick} = props;
    const SpecialNode = types[node.type || "response"];
	const CLASS_NAME = classNames("node-wrapper", `node-${node.type}`);
	const CONTAINER_CLASSES = classNames("node-container", {selected});

	return (
		<div className={CLASS_NAME} onClick={handleClick} style={{
			left: node.loc.x + "px",
			top: node.loc.y + "px"
		}}>
			<SpecialNode className={CONTAINER_CLASSES}
				{...props}
			/>
		</div>
	)
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({project}, {node}) => ({
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
	}
});

export default connect(mapState, mapDispatch)(Node);
