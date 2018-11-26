import {createHandlerReducer, buildActionCreators} from "../../helpers";
import initialState from './initialState';

import createNode from "./createNode";

// ========== TYPES

const types = {
	SELECT_NODE: "SELECT_NODE",
	CREATE_NODE: "CREATE_NODE",
	UPDATE_NODE: "UPDATE_NODE",
	DELETE_NODE: "DELETE_NODE",
	RECOVER_NODE: "RECOVER_NODE",
	UPDATE_EDGE: "UPDATE_EDGE"
};

// ========== INITIAL STATE

export const initial = initialState;

// ========== HANDLERS
export const handlers = {
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

		if (!newState.edges[selectedNode.id]) {
			newState.edges[selectedNode.id] = {};
		}

		newState.allNodeIds = newState.allNodeIds.concat(newNode.id);
		newState.edges[selectedNode.id][newNode.id] = { label: "New Edge" };
		newState.nodesById = Object.assign({}, newState.nodesById, {
			[newNode.id]: newNode
		});
		newState.graphsById[selectedGraph.id] = Object.assign({},
			selectedGraph, {
				allNodeIds: allNodeIds.concat(newNode.id)
			}
		);

		return newState;
	},
	[types.UPDATE_NODE]: function(state, node) {
		state = Object.assign({}, state);
		state.nodesById[node.id] = node;
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
	[types.UPDATE_EDGE]: function(state, {origId, destId, label}) {
		state = Object.assign({}, state);
		state.edges[origId][destId] = {
			label
		};
		return state;
	}
}

// ========== REDUCER

export default createHandlerReducer(initial, handlers);

// ========== CREATORS

export const actions = buildActionCreators(types);
