import {createHandlerReducer, buildActionCreators} from "../../helpers";
import initialState from './initialState';

function createId(length=10) {
	let id = "";
	for (let i = 0; i < length; i++) {
		const num = Math.random() * (90 - 65) + 65;
		id += String.fromCharCode(num);
	}
	return id;
}

// ========== TYPES

const types = {
	SELECT_NODE: "SELECT_NODE",
	CREATE_NODE: "CREATE_NODE",
	UPDATE_NODE: "UPDATE_NODE",
	UPDATE_CONNECTION: "UPDATE_CONNECTION",
	CREATE_LINK: "CREATE_LINK",
	UPDATE_LINK: "UPDATE_LINK",
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
	[types.CREATE_NODE]: function(state) {
		state = Object.assign({}, state);

		const newNodeId = createId();
		const {
			selectedGraphId, selectedNodeId, graphsById, nodesById
		} = state;

		const selectedGraph = graphsById[selectedGraphId];
		const {allNodeIds, allSectionIds} = selectedGraph;
		const selectedNode = nodesById[selectedNodeId];

		const newNodeSectionId = selectedNode.sectionId + 1;

		const NEW_SECTION = allSectionIds.includes(newNodeSectionId);

		state.allNodeIds = state.allNodeIds.concat(newNodeId);
		graphsById[selectedGraphId] = Object.assign({}, selectedGraph, {
			allNodeIds: allNodeIds.concat(newNodeId),
			allSectionIds: NEW_SECTION
				? allSectionIds
				: allSectionIds.concat(newNodeSectionId)
		});

		if (!state.connections[selectedNodeId]) {
			state.connections[selectedNodeId] = {};
		}

		state.connections[selectedNodeId][newNodeId] = {
			label: "New Connection"
		}

		state.nodesById = Object.assign({}, nodesById, {
			[newNodeId]: {
				id: newNodeId,
				graphId: selectedGraphId,
				sectionId: newNodeSectionId,
				name: "New Node",
				speech: "",
				reprompt: "",
				audio: []
			}
		});

		return state;
	},
	[types.UPDATE_NODE]: function(state, payload) {
		state = Object.assign({}, state)
		state.nodesById[payload.id] = payload;
		return state;
	},
	[types.UPDATE_CONNECTION]: function(state, {origId, destId, label}) {
		state = Object.assign({}, state);
		state.connections[origId][destId] = {
			label
		};
		return state;
	}
}

// ========== REDUCER

export default createHandlerReducer(initial, handlers);

// ========== CREATORS

export const actions = buildActionCreators(types);
