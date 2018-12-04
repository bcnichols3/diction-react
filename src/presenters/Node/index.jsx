import React from "react";
import {connect} from "react-redux";
import "./style.scss";

import classNames from "classnames";

import DragArea from "../../containers/DragArea";

import {actions as uiActions} from "../../reducers/ui";
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
			<DragArea
				className="node-drag-area"
				onMouseMove={props.onNodeDrag}
				pos={node.loc}>
				<SpecialNode className={CONTAINER_CLASSES} {...props} />
			</DragArea>
		</div>
	)
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({project, ui}, {node}) => ({
	locX: node.loc.x + project.graphsById[node.graphId].loc.x,
	locY: node.loc.y + project.graphsById[node.graphId].loc.y,
	selected: node.id === project.selectedNodeId,
	isDragging: ui.control || ui.drag,
});

const mapDispatch = {
	selectNode: projectActions.selectNode,
	updateNode: projectActions.updateNode,
	toggleNodeDrag: uiActions.toggleNodeDrag,
}

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
	...stateProps,
	...dispatchProps,
	...ownProps,
	handleClick(evt) {
		evt.stopPropagation();
		if (stateProps.isDragging) return;
		dispatchProps.selectNode({nodeId: ownProps.node.id});
	},
	onNodeDrag(loc) {
		const editedNode = Object.assign({}, ownProps.node, {loc})
		dispatchProps.updateNode(editedNode)
	},
	handleChange(evt) {
		const {value, dataset} = evt.target;
		const key = dataset.keystring;

		const editedNode = Object.assign({}, ownProps.node, {
			[key]: value
		});

		dispatchProps.updateNode(editedNode);
	}
});

export default connect(mapState, mapDispatch, mergeProps)(Node);
