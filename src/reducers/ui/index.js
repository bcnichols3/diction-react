import {createHandlerReducer, buildActionCreators} from "../../helpers";

// ========== TYPES

const types = {
	TOGGLE_NAV: "TOGGLE_NAV",
	PHASE_MODAL: "PHASE_MODAL"
};

// ========== INITIAL STATE

export const initial = {
	navOpen: false,
	modalPhases: {
		newConnection: "closed"
	}
};

// ========== HANDLERS
export const handlers = {
	[types.TOGGLE_NAV]: function(state) {
		return Object.assign({}, state, {
			navOpen: !state.navOpen
		});
	},
	[types.PHASE_MODAL]: function(state, {name, phase}) {
		return Object.assign({}, state, {
			modalPhases: Object.assign({}, state.modalPhases, {
				[name]: phase
			})
		});
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
