import {createHandlerReducer, buildActionCreators} from "../../helpers";
import initialState from './initialState';

import {
	selectNode, createNode, createNodeEdge, deleteNodeEdge
} from "./manipulators";

// ========== TYPES

const types = {
	RECEIVE_PROJECT: "RECEIVE_PROJECT",
	UPDATE_GRAPH: "UPDATE_GRAPH",
	SELECT_NODE: "SELECT_NODE",
	CREATE_NODE: "CREATE_NODE",
	UPDATE_NODE: "UPDATE_NODE",
	INSERT_NODE: "INSERT_NODE",
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
	[types.UPDATE_GRAPH]: function(state, graph) {
		state = Object.assign({}, state);
		state.graphsById = Object.assign({}, state.graphsById, {
			[graph.id]: graph
		});
		return state;
	},
	[types.SELECT_NODE]: function(state, {nodeId}) {
		const newState = Object.assign({}, state);
		selectNode(newState, {nodeId});
		return newState
	},
	[types.CREATE_NODE]: function(state, {type}) {
		const newState = Object.assign({}, state);

		const parentId = newState.selectedNodeId;

		const newNode = createNode(newState, {type, parentId});

		createNodeEdge(newState, {type, parentId, childId: newNode.id});
		selectNode(newState, {nodeId: newNode.id});

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
	[types.UPDATE_EDGE]: function(state, edge) {
		const newState = Object.assign({}, state, {
			edges: Object.assign({}, state.edges)
		});
		newState.edges[edge.parentId][edge.childId] = edge;
		return newState;
	},
	[types.INSERT_NODE]: function(state, {type, edge}) {
		const newState = Object.assign({}, state);
		const {parentId, childId} = edge;

		const newNode = createNode(newState, {type, parentId});

		// reassign the parent of the child
		newState.nodesById[childId].parentId = newNode.id;

		// connect parent to new node
		createNodeEdge(newState, {type, parentId, childId: newNode.id});
		// connect new node to child
		createNodeEdge(newState, {type, parentId: newNode.id, childId});
		// delete old connection
		deleteNodeEdge(newState, {parentId, childId});
		// select inserted node
		selectNode(newState, {nodeId: newNode.id});
		return newState;
	}
}

// ========== REDUCER

export default createHandlerReducer(initial, handlers);

// ========== CREATORS

export const actions = buildActionCreators(types);
