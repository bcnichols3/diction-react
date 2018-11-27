import React, {Fragment} from "react";
import {connect} from "react-redux";
import "./style.scss";

import classNames from "classnames";

import {actions as projectActions} from "../../reducers/project";

import NodeInfo from "./NodeInfo";
import SidebarSection from "./SidebarSection";

import nodeTypes from "../Node/nodeTypes";
const nodeTypeStrings = Object.keys(nodeTypes);

/* -----------------    COMPONENT     ------------------ */

const Sidebar = (props) => {
	const {open, node, allNodeIds, nodesById} = props;
	const CLASS_NAME = classNames("sidebar-wrapper", {open});

	const suitableConnections = allNodeIds.filter(props.filterNodes);
	const suitableTypes = nodeTypeStrings.filter(props.filterTypes);

	return (
		<div className={CLASS_NAME}>
			<div className="sidebar-container">
				<NodeInfo {...node} />
				<SidebarSection>
				{suitableConnections.length
					? (<Fragment>
						<h6 className="section-hed">Add Connection</h6>
						<select onChange={props.handleCreateEdge}>
							{suitableConnections.map(id => (
								<option key={id} value={id}>
									{nodesById[id].name}
								</option>
							))}
						</select>
					</Fragment>)
				: <h6>No Connectable Nodes</h6>}
				</SidebarSection>
				<SidebarSection>
					{suitableTypes.map(str => (
						<button key={str} data-type={str}
							onClick={props.handleCreate}>
							{`New ${str}`}
						</button>
					))}
				</SidebarSection>
				<SidebarSection className="sidebar-bottom-section">
					<button data-type="decision"
						onClick={props.handleClick}>
						Delete Node
					</button>
				</SidebarSection>
			</div>
		</div>
	);
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ui, project}) => ({
	open: !!project.nodesById[project.selectedNodeId],
	node: project.nodesById[project.selectedNodeId],
	nodesById: project.nodesById,
	allNodeIds: project.allNodeIds,
	edges: project.edges
});

const mapDispatch = (dispatch, {node}) => ({
	dispatch,
	handleCreate(evt) {
		const {type} = evt.target.dataset
		dispatch(projectActions.createNode({type}));
	},
	handleDelete(evt) {
		dispatch(projectActions.deleteNode({nodeId: node.id}));
	}
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const {node, nodesById, edges} = stateProps;

	return {
		...stateProps,
		...dispatchProps,
		...ownProps,
		filterNodes(id) {
			const curNode = nodesById[id];
			if (!node || id === node.id
			|| (edges[node.id] && edges[node.id][id])) return false;
			switch (curNode.type) {
				case "request":
					return curNode.name !== "launch";
				// case "response":
				// 	return true;
				// case "decision":
				// 	return true;
				default:
					return true;
			}
		},
		filterTypes(type) {
			if (!node) return false;
			switch (node.type) {
				case "request":
					return type !== "request";
				// case "response":
				// 	return true;
				// case "decision":
				// 	return true;
				default:
					return true;
			}
		},
		handleCreateEdge(evt) {
			const origId = stateProps.node.id;
			const destId = evt.target.value;
			dispatchProps.dispatch(projectActions.createEdge({origId, destId}));
		}
	}
}

export default connect(mapState, mapDispatch, mergeProps)(Sidebar);
