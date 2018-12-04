import {createHandlerReducer, buildActionCreators} from "../../helpers";

// ========== TYPES

const types = {
	TOGGLE_APPBAR: "TOGGLE_APPBAR",
	TOGGLE_CONTROL: "TOGGLE_CONTROL",
	TOGGLE_DRAG: "TOGGLE_DRAG",
	PHASE_MODAL: "PHASE_MODAL",
	WINDOW_CHANGE: "WINDOW_CHANGE"
};

// ========== INITIAL STATE

export const initial = {
	appbarOpen: false,
	sidebarOpen: false,
	control: false,
	drag: false,
	modalPhases: {
		newEdge: "closed",
		uploadProject: "closed"
	},
	windowSize: {
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
	[types.TOGGLE_DRAG]: function(state) {
		return Object.assign({}, state, {
			drag: !state.drag
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
			windowSize: {
				width: window.innerWidth,
				height: window.innerHeight - 50
			}
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
