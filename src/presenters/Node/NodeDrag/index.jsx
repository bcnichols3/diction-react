import React, {PureComponent} from "react";
import {connect} from "react-redux";

import {actions as uiActions} from "../../../reducers/ui";

/* -----------------    COMPONENT     ------------------ */

class NodeDrag extends PureComponent {
	constructor(props) {
		super(props);

		this.diffX = 0
		this.diffY = 0

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
	}

	handleMouseDown(evt) {
		evt.preventDefault();
		if (this.props.nodeDrag) return;
		this.props.toggleNodeDrag();
		this.diffX = evt.clientX;
		this.diffY = evt.clientY;
		console.log('DIFFS', this.diffX, this.diffY);
		window.onmousemove = this.handleMouseMove;
		window.onmouseup = this.handleMouseUp;
	}

	handleMouseMove(evt) {
		evt.preventDefault();
		const {node, updateNode} = this.props;
		const editedNode = Object.assign({}, node);
		editedNode.loc = {
			x: node.loc.x + evt.clientX - this.diffX,
			y: node.loc.y + evt.clientY - this.diffY
		}
		this.diffX = evt.clientX;
		this.diffY = evt.clientY;
		updateNode(editedNode);
	}

	handleMouseUp(evt) {
		evt.preventDefault();
		window.onmouseup = null;
		window.onmousemove = null;
		this.props.toggleNodeDrag();
	}

	render() {
		return (
			<div className="node-drag-area"
				onMouseDown={this.handleMouseDown}
			/>
		)
	}
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ui}) => ({
	nodeDrag: ui.nodeDrag,
});

const mapDispatch = {
	toggleNodeDrag: uiActions.toggleNodeDrag
}

export default connect(mapState, mapDispatch)(NodeDrag);
