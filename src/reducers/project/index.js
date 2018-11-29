import {createHandlerReducer, buildActionCreators} from "../../helpers";
import initialState from './initialState';

import createNode from "./createNode";

// ========== TYPES

const types = {
	RECEIVE_PROJECT: "RECEIVE_PROJECT",
	SELECT_NODE: "SELECT_NODE",
	CREATE_NODE: "CREATE_NODE",
	UPDATE_NODE: "UPDATE_NODE",
	DELETE_NODE: "DELETE_NODE",
	RECOVER_NODE: "RECOVER_NODE",
	CREATE_EDGE: "CREATE_EDGE",
	UPDATE_EDGE: "UPDATE_EDGE"
};

// ========== INITIAL STATE

export const initial = initialState;

// ========== HANDLERS
export const handlers = {
	[types.RECEIVE_PROJECT]: function(state, project) {
		return project ? project : state;
	},
	[types.SELECT_NODE]: function(state, {nodeId}) {
		return Object.assign({}, state, {
			selectedNodeId: nodeId
		});
	},
	[types.CREATE_NODE]: function(state, {type}) {
		const newState = Object.assign({}, state);

		const selectedGraph = newState.graphsById[newState.selectedGraphId];
		const {allNodeIds} = selectedGraph;
		const selectedNode = newState.nodesById[newState.selectedNodeId];

		const newNode = createNode(type, selectedNode, selectedGraph);

		// add to node registries
		newState.allNodeIds = newState.allNodeIds.concat(newNode.id);
		newState.graphsById[selectedGraph.id] = Object.assign({},
			selectedGraph, {
				allNodeIds: allNodeIds.concat(newNode.id)
			}
		);
		newState.nodesById = Object.assign({}, newState.nodesById, {
			[newNode.id]: newNode
		});
		// add edges (comments have no edges)
		if (type !== "comment") {
			if (!newState.edges[selectedNode.id]) {
				newState.edges[selectedNode.id] = {};
			}
			newState.edges[selectedNode.id][newNode.id] = {
				label: "New Edge"
			};
			newState.edges[newNode.id] = {};
		}

		return newState;
	},
	[types.UPDATE_NODE]: function(state, node) {
		state = Object.assign({}, state);
		state.nodesById = Object.assign({}, state.nodesById, {
			[node.id]: node
		});
		return state;
	},
	[types.DELETE_NODE]: function(state, {nodeId}) {
		state = Object.assign({}, state);
		state.nodesById[nodeId].deactivated = true;
		return state;
	},
	[types.RECOVER_NODE]: function(state, {nodeId}) {
		state = Object.assign({}, state);
		state.nodesById[nodeId].deactivated = false;
		return state;
	},
	[types.CREATE_EDGE]: function(state, {origId, destId}) {
		const newState = Object.assign({}, state, {
			edges: Object.assign({}, state.edges)
		});
		if (!newState.edges[origId]) newState.edges[origId] = {};
		newState.edges[origId][destId] = {
			label: "New Edge"
		};
		return newState;
	},
	[types.UPDATE_EDGE]: function(state, {origId, destId, label}) {
		const newState = Object.assign({}, state, {
			edges: Object.assign({}, state.edges)
		});
		newState.edges[origId][destId] = {
			label
		};
		return newState;
	}
}

// ========== REDUCER

export default createHandlerReducer(initial, handlers);

// ========== CREATORS

export const actions = buildActionCreators(types);
