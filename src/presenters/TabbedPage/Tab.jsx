import React from "react";

import {NavLink} from "redux-first-router-link";

/* -----------------    COMPONENT     ------------------ */

const Tab = (props) => {
	const {id, children} = props;
	const isActive = (match, location) => location.pathname === "/"+id;

	return (
		<NavLink to={id}
			className="tab"
			activeClassName="open"
			isActive={isActive}>
			{children}
		</NavLink>
	);
}

export default Tab;
