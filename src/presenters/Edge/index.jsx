import React from "react";
import {connect} from "react-redux";
import "./style.scss";

// import classNames from "classnames";

import {actions as projectActions} from "../../reducers/project";

/* -----------------    COMPONENT     ------------------ */

const Edge = ({label, orig, dest, viewBox, handleChange}) => {
	return (
		<svg className="edge-wrapper"
			viewBox={viewBox}
			xmlns="http://www.w3.org/2000/svg">
			<line stroke="black"
				strokeWidth="5px"
				x1={orig.loc.x} y1={orig.loc.y}
				x2={dest.loc.x} y2={dest.loc.y}
			/>
		</svg>
	)
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({project, ui}, {origId, destId}) => {
	const orig = project.nodesById[origId];
	const dest = project.nodesById[destId];
	const edge = project.edges[origId][destId];
	const {graphSize} = ui;
	return {
		viewBox: `0 0 ${graphSize.width} ${graphSize.height}`,
		label: edge.label,
		orig: {
			id: orig.id,
			loc: orig.loc
		},
		dest: {
			id: dest.id,
			loc: dest.loc
		}
	}
}

const mapDispatch = (dispatch, {origId, destId}) => ({
	handleChange(evt) {
		dispatch(projectActions.updateEdge({
			origId,
			destId,
			label: evt.target.value
		}));
	}
})

export default connect(mapState, mapDispatch)(Edge)
