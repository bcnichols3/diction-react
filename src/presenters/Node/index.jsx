import React from "react";
import {connect} from "react-redux";
import "./style.scss";

import classNames from "classnames";

import {actions as projectActions} from "../../reducers/project";

import nodeTypes from "./nodeTypes";

/* -----------------    COMPONENT     ------------------ */

const Node = (props) => {
	const {node, selected, handleClick, locX, locY} = props;
    const SpecialNode = nodeTypes[node.type || "response"];
	const CLASS_NAME = classNames("node-wrapper", `node-${node.type}`);
	const CONTAINER_CLASSES = classNames("node-container", {selected});

	return (
		<div className={CLASS_NAME} onClick={handleClick} style={{
			left: locX + "px",
			top: locY + "px"
		}}>
			<SpecialNode className={CONTAINER_CLASSES} {...props} />
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
		const {value, dataset} = evt.target;
		const key = dataset.keystring;

		const editedNode = Object.assign({}, node, {
			[key]: value
		});

		dispatch(projectActions.updateNode(editedNode));
	}
});

export default connect(mapState, mapDispatch)(Node);
