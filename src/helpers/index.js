const camelCase = require('lodash/camelCase');

// REDUX FUNCTIONS

export function buildActionCreators(types, name='payload') {
	const creators = {}

	Object.values(types).forEach(type => {
		creators[camelCase(type)] = payload => ({ type, [name]: payload });
	})

	return creators;
}

export function createHandlerReducer(initialState, handlers) {
	return function reducer(state = initialState, action) {
		if (handlers.hasOwnProperty(action.type)) {
			return handlers[action.type](state, action);
		} else {
			return state;
		}
	};
}
