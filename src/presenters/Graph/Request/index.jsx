import React from "react";
import {connect} from "react-redux";
import "./style.scss";

import classNames from "classnames";

/* -----------------    COMPONENT     ------------------ */

const Request = ({className, value}) => {
	const CLASS_NAME = classNames("line", className);
	return (
		<div className={CLASS_NAME}>
			<input autocomplete="off" value={value} />
		</div>
	)
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({project}, {nodeId}) => ({
	node: project.nodesById[nodeId],

})

export default connect()(Request);
