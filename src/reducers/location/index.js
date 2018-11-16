import { connectRoutes } from "redux-first-router";

import { buildActionCreators } from "../../helpers";

// ========== TYPES

const types = {};
const routeMap = {
	"ROUTE_HOME": "/home"
};

export {types, routeMap};

// ========== REDUCER & MIDDLEWARE

const { reducer, middleware, enhancer } = connectRoutes(routeMap);
export { reducer, middleware, enhancer };

// ========== CREATORS

export const actions = buildActionCreators(types);
