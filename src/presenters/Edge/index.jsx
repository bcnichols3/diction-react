import React from "react";
import {connect} from "react-redux";
import "./style.scss";

// import classNames from "classnames";

import {actions as projectActions} from "../../reducers/project";

/* -----------------    COMPONENT     ------------------ */

const Edge = ({label, orig, dest, viewBox, handleChange}) => {
	const lineId = `edge_${orig.id}_${dest.id}`
	return (
		<svg className="edge-wrapper"
			viewBox={viewBox}
			xmlns="http://www.w3.org/2000/svg">
			<path id={lineId}
				stroke="black"
				strokeWidth="5px"
				d={`M${orig.loc.x} ${orig.loc.y} L ${dest.loc.x} ${dest.loc.y}`}
			/>
			<text textAnchor="middle" dy="-5">
				<textPath href={"#"+lineId} startOffset="50%">
					{label}
				</textPath>
			</text>
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
