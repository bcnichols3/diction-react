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
	CREATE_NODE: "CREATE_NODE",
	UPDATE_NODE: "UPDATE_NODE",
	CREATE_LINK: "CREATE_LINK",
	UPDATE_LINK: "UPDATE_LINK",
};

// ========== INITIAL STATE

export const initial = initialState;

// ========== HANDLERS
export const handlers = {
	[types.CREATE_NODE]: function(state, {payload}) {
		const {connection} = payload;

		const id = createId();
		state.allNodeIds = state.allNodeIds.concat(id);
		state.nodesById = Object.assign({}, state.nodesById, {
			[id]: {
				id,
				speech: "",
				reprompt: "",
				audio: [],
				connections: connection ? [connection] : []
			}
		});

		return state;
	},
	[types.UPDATE_NODE]: function(state, {payload}) {
		state = Object.assign({}, state)
		console.log('PAYLOAD', payload);
		state.nodesById[payload.id] = payload;
		return state;
	}
}

// ========== REDUCER

export default createHandlerReducer(initial, handlers);

// ========== CREATORS

export const actions = buildActionCreators(types);
