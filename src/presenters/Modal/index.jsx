import React, {PureComponent} from "react";
import {connect} from "react-redux";
import "./style.scss";

import kebabCase from "lodash-es/kebabCase";

import {advanceModalPhase} from "../../reducers/ui";

import classNames from "classnames";

/* -----------------    COMPONENT     ------------------ */

class Modal extends PureComponent {
	// componentDidMount() {
	// 	window.addEventListener("keydown", this.props.handleEsc);
	// }
	//
	// componentWillUnmount() {
	// 	window.removeEventListener("keydown", this.props.handleEsc);
	// }

	render() {
		const {name, phase, className, handleClick} = this.props;
		const CLASS_NAMES = classNames(
			"modal-shadow",
			className,
			`phase-${phase}`
		);

		if (phase === "closed") {
			window.removeEventListener("keydown", this.props.handleEsc);
			return null;
		}

		window.addEventListener("keydown", this.props.handleEsc);

		return (
			<div id={`${kebabCase(name)}-modal`} className={CLASS_NAMES}>
				<div className="modal-overlay" onClick={handleClick}>
					<div className="modal-container">
						<div className="modal-close-button" onClick={handleClick}>
							<div className="modal-close-bar-1" />
							<div className="modal-close-bar-2" />
						</div>
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}

/* -----------------    CONTAINER     ------------------ */

const mapDispatch = (dispatch, {name, delay, phase}) => ({
	handleEsc: (evt) => {
		if (evt.keyCode === 27) {
			dispatch(advanceModalPhase({name, delay, phase}));
		}
	},
	handleClick: (evt) => {
		evt.stopPropagation();
		if (evt.target === evt.currentTarget) {
			dispatch(advanceModalPhase({name, delay, phase}))
		}
	}
});

export default connect(null, mapDispatch)(Modal);
