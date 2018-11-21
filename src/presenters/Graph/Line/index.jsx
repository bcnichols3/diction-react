import React from "react";
import "./style.scss";

import classNames from "classnames";

/* -----------------    COMPONENT     ------------------ */

const Line = ({className}) => {
	const CLASS_NAME = classNames("line", className);
	return (
		<div className={CLASS_NAME} />
	)
}

export default Line;
