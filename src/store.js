import {createStore, applyMiddleware, combineReducers, compose} from 'redux';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

import form from './reducers/forms';
import project from './reducers/project';
import ui from './reducers/ui';

import * as location from './reducers/location';

const REDUCERS = { form, ui,project, location: location.reducer };

const MIDDLEWARES = (process.env.NODE_ENV === 'production')
	? [thunk, location.middleware]
	: [thunk, logger, location.middleware]
;

export default createStore(
	combineReducers(REDUCERS),
	compose(
		location.enhancer,
		applyMiddleware(...MIDDLEWARES)
	)
);
