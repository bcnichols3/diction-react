import React from "react";
import {connect} from "react-redux";

import DragArea from "../../../containers/DragArea";

import {actions as uiActions} from "../../../reducers/ui";
import {actions as projectActions} from "../../../reducers/project";

/* -----------------    COMPONENT     ------------------ */

const NodeDrag = (props) => {
	const {node} = props;
	return (
		<DragArea
			className="node-drag-area"
			toggleDrag={props.toggleNodeDrag}
			isDragging={props.nodeIsDragging}
			onMouseMove={props.onMouseMove}
			pos={node.loc} />
	)
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ui}) => ({
	nodeIsDragging: ui.nodeDrag,
});

const mapDispatch = (dispatch, {node}) => ({
	toggleNodeDrag() {
		dispatch(uiActions.toggleNodeDrag());
	},
	onMouseMove(loc) {
		const newGraph = Object.assign({}, node, {loc})
		dispatch(projectActions.updateNode(newGraph))
	},
})

export default connect(mapState, mapDispatch)(NodeDrag);
