import {createHandlerReducer, buildActionCreators} from "../../helpers";

// ========== TYPES

const types = {
	TOGGLE_NAV: "TOGGLE_NAV"
};

// ========== INITIAL STATE

export const initial = {
	navOpen: false
};

// ========== HANDLERS
export const handlers = {
	[types.TOGGLE_NAV]: function(state) {
	return Object.assign({}, state, {
		navOpen: !state.navOpen
	});
},
}

// ========== REDUCER

export default createHandlerReducer(initial, handlers);

// ========== CREATORS

export const actions = buildActionCreators(types);
