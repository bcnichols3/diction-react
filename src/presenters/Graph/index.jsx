import React from 'react';
import {connect} from 'react-redux';
import "./style.scss";

import DragArea from "../../containers/DragArea";

import {actions as projectActions} from "../../reducers/project";
import {actions as uiActions} from "../../reducers/ui";

import Node from '../Node';
import Edge from "../Edge";


/* -----------------    COMPONENT     ------------------ */

const Graph = (props) => {
	const {graph, edges, nodesById, handleClick} = props;

	return (
		<DragArea
			className="graph-drag-area"
			toggleDrag={props.toggleGraphDrag}
			isControlling={props.control}
			isDragging={props.graphIsDragging}
			onMouseMove={props.onMouseMove}
			pos={graph.loc}>
			<div className="graph-wrapper" onClick={handleClick}>
				{graph.allNodeIds.map((nodeId, idx) => (
					<Node key={nodeId} node={nodesById[nodeId]} />
				))}
				{graph.allNodeIds.map(parentId => {
					if (!edges[parentId]) return null;
					return Object.keys(edges[parentId]).map(childId => (
						<Edge key={parentId + childId}
							edge={edges[parentId][childId]}
						/>
					))
				})}
			</div>
		</DragArea>
	)
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({project, ui}, {graph}) => {
	// const graph = project.graphsById[project.selectedGraphId];
	return {
		graph,
		edges: project.edges,
		nodesById: project.nodesById,
		control: ui.control,
		graphIsDragging: ui.graphDrag,
	}
}

const mapDispatch = {
	updateGraph: projectActions.updateGraph,
	selectNode: projectActions.selectNode,
	toggleGraphDrag: uiActions.toggleGraphDrag
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const {selectNode, updateGraph} = dispatchProps;
	return {
		...stateProps,
		...dispatchProps,
		...ownProps,
		handleClick(evt) {
			if (stateProps.control) return;
			selectNode({nodeId: null});
		},
		onMouseMove(loc) {
			if (!stateProps.control) return;
			const newGraph = Object.assign({}, stateProps.graph, {loc});
			updateGraph(newGraph);
		},
	}
}

export default connect(mapState, mapDispatch, mergeProps)(Graph);
