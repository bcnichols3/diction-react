import React, {Fragment} from "react";
// import {connect} from "react-redux";
// import "./style.scss";

import classNames from "classnames";

/* -----------------    COMPONENT     ------------------ */

const Page = (props) => {
	const {className, children} = props;
	const CLASS_NAME = classNames("page-wrapper", className);

	return (
		<div className={CLASS_NAME}>
			{children}
		</div>
	);
}

export default Page;
