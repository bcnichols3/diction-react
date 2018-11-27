import React from "react";
import {connect} from "react-redux";
import "./style.scss";

import classNames from "classnames";

import {actions as projectActions} from "../../reducers/project";

import NodeInfo from "./NodeInfo";

/* -----------------    COMPONENT     ------------------ */

const Sidebar = (props) => {
	const {selectedNode, open, node} = props;
	const CLASS_NAME = classNames("sidebar-container", {open});
	console.log('SELECTED NODE', selectedNode);

	return (
		<div className={CLASS_NAME}>
			<NodeInfo {...node} />
			{selectedNode && selectedNode.name}
			<button data-type="response"
				onClick={props.handleCreate}>
				Add Response
			</button>
			<button data-type="request"
				onClick={props.handleCreate}>
				Add Request
			</button>
			<button data-type="decision"
				onClick={props.handleCreate}>
				Add Decision
			</button>
			<div className="separator" />
			<button data-type="decision"
				onClick={props.handleClick}>
				Delete Node
			</button>
		</div>
	);
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ui, project}) => ({
	open: !!project.nodesById[project.selectedNodeId],
	node: project.nodesById[project.selectedNodeId]
});

const mapDispatch = (dispatch, {node}) => ({
	handleCreate(evt) {
		const {type} = evt.target.dataset
		dispatch(projectActions.createNode({type}));
	},
	handleDelete(evt) {
		dispatch(projectActions.deleteNode({nodeId: node.id}));
	}
});

export default connect(mapState, mapDispatch)(Sidebar);
