import React from "react";
import {connect} from "react-redux";

import {actions as projectActions} from "../../reducers/project";

import Sidebar from "../../presenters/Sidebar";
import NodeInfo from "../../presenters/NodeInfo";

import CreateNodeButtons from "./CreateNodeButtons";

/* -----------------    COMPONENT     ------------------ */

const NodeSidebar = (props) => {
	const {open, selectedNode, handleDelete} = props;

	return (
		<Sidebar.Wrapper open={open}>
			<Sidebar.Section>
				<NodeInfo {...selectedNode} />
			</Sidebar.Section>
			<Sidebar.Section>
				<CreateNodeButtons {...props} />
			</Sidebar.Section>
			<Sidebar.Section className="sidebar-bottom-section">
				<button onClick={handleDelete}>
					Delete Node
				</button>
			</Sidebar.Section>
		</Sidebar.Wrapper>
	);
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ui, project}) => ({
	open: !!project.nodesById[project.selectedNodeId],
	selectedNode: project.nodesById[project.selectedNodeId],
	nodesById: project.nodesById,
	allNodeIds: project.allNodeIds,
	edges: project.edges
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const {selectedNode} = stateProps;
	const {dispatch} = dispatchProps;

	return {
		...stateProps,
		...dispatchProps,
		...ownProps,
		handleCreateEdge(evt) {
			dispatch(projectActions.createEdge({
				origId: selectedNode.id,
				destId: evt.target.value
			}));
		},
		handleCreateNode(evt) {
			const {type} = evt.target.dataset;
			dispatch(projectActions.createNode({type}));
		},
		handleDelete(evt) {
			dispatch(projectActions.deleteNode({nodeId: selectedNode.id}));
		}
	}
}

export default connect(mapState, null, mergeProps)(NodeSidebar);
