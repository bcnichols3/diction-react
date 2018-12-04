import React, {PureComponent} from "react";
// import {connect} from "react-redux";

import classNames from "classnames";

// import {actions as uiActions} from "../../../reducers/ui";
// import {actions as projectActions} from "../../../reducers/project";

/* -----------------    COMPONENT     ------------------ */

class DragArea extends PureComponent {
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
		evt.stopPropagation();
		if (this.props.isDragging || !this.props.isControlling) return;
		this.props.toggleDrag();

		this.diffX = evt.clientX;
		this.diffY = evt.clientY;

		window.onmousemove = this.handleMouseMove;
		window.onmouseup = this.handleMouseUp;
	}

	handleMouseMove(evt) {
		evt.preventDefault();
		this.props.onMouseMove({
			x: this.props.pos.x + evt.clientX - this.diffX,
			y: this.props.pos.y + evt.clientY - this.diffY
		});
		this.diffX = evt.clientX;
		this.diffY = evt.clientY;
	}

	handleMouseUp(evt) {
		evt.preventDefault();
		window.onmouseup = null;
		window.onmousemove = null;
		this.props.toggleDrag();
	}

	render() {
		const {className, isDragging, isControlling} = this.props;
		const CLASS_NAME = classNames(className, {
			dragging: isDragging,
			controlling: isControlling
		});
		return (
			<div className={CLASS_NAME}
				onMouseDown={this.handleMouseDown}>
				{this.props.children}
			</div>
		)
	}
}

export default DragArea;
