import {createHandlerReducer, buildActionCreators} from "../../helpers";

// ========== TYPES

const types = {
	TOGGLE_APPBAR: "TOGGLE_APPBAR",
	TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
	TOGGLE_CONTROL: "TOGGLE_CONTROL",
	TOGGLE_NODE_DRAG: "TOGGLE_NODE_DRAG",
	PHASE_MODAL: "PHASE_MODAL",
	TOGGLE_GRAPH_DRAG: "TOGGLE_GRAPH_DRAG",
	UPDATE_GRAPH_POS: "UPDATE_GRAPH_POS",
	WINDOW_CHANGE: "WINDOW_CHANGE"
};

// ========== INITIAL STATE

export const initial = {
	appbarOpen: false,
	sidebarOpen: false,
	control: false,
	nodeDrag: false,
	graphDrag: false,
	modalPhases: {
		newEdge: "closed",
		uploadProject: "closed"
	},
	graphSize: {
		width: window.innerWidth,
		height: window.innerHeight
	},
};

// ========== HANDLERS
export const handlers = {
	[types.TOGGLE_APPBAR]: function(state) {
		return Object.assign({}, state, {
			appbarOpen: !state.appbarOpen
		});
	},
	[types.TOGGLE_CONTROL]: function(state) {
		return Object.assign({}, state, {
			control: !state.control
		});
	},
	[types.TOGGLE_GRAPH_DRAG]: function(state) {
		return Object.assign({}, state, {
			graphDrag: !state.graphDrag
		});
	},
	[types.PHASE_MODAL]: function(state, {name, phase}) {
		return Object.assign({}, state, {
			modalPhases: Object.assign({}, state.modalPhases, {
				[name]: phase
			})
		});
	},
	[types.WINDOW_CHANGE]: function(state) {
		return Object.assign({}, state, {
			graphSize: {
				width: window.innerWidth,
				height: window.innerHeight - 50
			}
		})
	},
	[types.TOGGLE_NODE_DRAG]: function(state) {
		return Object.assign({}, state, {
			nodeDrag: !state.nodeDrag
		})
	},
	[types.TOGGLE_WINDOW_DRAG]: function(state) {
		return Object.assign({}, state, {
			windowDrag: !state.windowDrag
		})
	}
}

// ========== REDUCER

export default createHandlerReducer(initial, handlers);

// ========== CREATORS

export const actions = buildActionCreators(types);

// ========== THUNKS

const PHASES = ["closed", "opening", "open", "closing"];
const advancePhase = (phase) => {
	return PHASES[(PHASES.indexOf(phase) + 1) % PHASES.length];
}
export const advanceModalPhase = ({name, phase, delay=20}) => dispatch => {
	phase = advancePhase(phase);
	dispatch(actions.phaseModal({name, phase}))
	phase = advancePhase(phase);
	setTimeout(() => {
		dispatch(actions.phaseModal({name, phase}))
	}, delay);
}
