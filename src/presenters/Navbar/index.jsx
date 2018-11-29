import React from "react";
import "./style.scss";

import classNames from "classnames";

/* -----------------    COMPONENT     ------------------ */

const Navbar = (props) => {
	const CLASS_NAMES = classNames("navbar", props.className)
	return (<div className={CLASS_NAMES}>
		{props.children}
	</div>)
}

export default Navbar;
