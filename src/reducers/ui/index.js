import {createHandlerReducer, buildActionCreators} from "../../helpers";

// ========== TYPES

const types = {
	TOGGLE_APPBAR: "TOGGLE_APPBAR",
	TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
	PHASE_MODAL: "PHASE_MODAL",
	WINDOW_CHANGE: "WINDOW_CHANGE"
};

// ========== INITIAL STATE

export const initial = {
	appbarOpen: false,
	sidebarOpen: false,
	modalPhases: {
		newConnection: "closed"
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
				height: window.innerHeight
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
const advancePhase = (phase) => PHASES[(PHASES.indexOf(phase) + 1) % PHASES.length];
export const advanceModalPhase = ({name, delay=20, phase}) => dispatch => {
	phase = advancePhase(phase);
	dispatch(actions.phaseModal({name, phase}))
	phase = advancePhase(phase);
	setTimeout(() => {
		dispatch(actions.phaseModal({name, phase}))
	}, delay);
}
