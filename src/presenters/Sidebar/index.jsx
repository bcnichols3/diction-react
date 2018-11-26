import React from "react";
import {connect} from "react-redux";
import "./style.scss";

import classNames from "classnames";

import {actions as projectActions} from "../../reducers/project";

/* -----------------    COMPONENT     ------------------ */

const Sidebar = (props) => {
	const {selectedNode, open} = props;
	const CLASS_NAME = classNames("sidebar-container", {open});
	return (
		<div className={CLASS_NAME}>
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
	selectedNode: project.nodesById[project.selectedNodeId]
});

const mapDispatch = (dispatch, {selectedNode}) => ({
	handleCreate(evt) {
		const {type} = evt.target.dataset
		dispatch(projectActions.createNode({type}));
	},
	handleDelete(evt) {
		dispatch(projectActions.deleteNode({nodeId: selectedNode.id}));
	}
});

export default connect(mapState, mapDispatch)(Sidebar);
