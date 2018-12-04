import React from "react";
import {connect} from "react-redux";
import "./style.scss";

// import classNames from "classnames";

import {actions as projectActions} from "../../reducers/project";

/* -----------------    COMPONENT     ------------------ */

const Edge = (props) => {
	const {label, parentId, parentLoc, childId, childLoc, viewBox, handleDoubleClick} = props;
	const lineId = `edge_${parentId}_${childId}`
	return (
		<svg className="edge-wrapper"
			viewBox={viewBox}
			xmlns="http://www.w3.org/2000/svg">
			<path id={lineId}
				stroke="black"
				strokeWidth="5px"
				onDoubleClick={handleDoubleClick}
				d={`M${parentLoc.x} ${parentLoc.y} L ${childLoc.x} ${childLoc.y}`}
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

const mapState = ({project, ui}, {edge}) => {
	const parent = project.nodesById[edge.parentId];
	const child = project.nodesById[edge.childId];
	const graph = project.graphsById[parent.graphId];
	const {graphSize} = ui;

	return {
		...project.edges[parent.id][child.id],
		viewBox: `0 0 ${graphSize.width} ${graphSize.height}`,
		parentLoc: {
			x: parent.loc.x + graph.loc.x,
			y: parent.loc.y + graph.loc.y
		},
		childLoc: {
			x: child.loc.x + graph.loc.x,
			y: child.loc.y + graph.loc.y
		}
	}
}

const mapDispatch = (dispatch, {edge}) => ({
	handleDoubleClick(evt) {
		evt.stopPropagation();
		dispatch(projectActions.insertNode({type: "decision", edge}))
	},
	handleChange(evt) {
		const newEdge = Object.assign({}, edge, {
			label: evt.target.value
		})
		dispatch(projectActions.updateEdge(newEdge));
	}
})

export default connect(mapState, mapDispatch)(Edge)
