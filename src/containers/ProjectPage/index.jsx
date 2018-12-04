import React, {PureComponent, Fragment} from "react";
import {connect} from "react-redux";

import {actions as uiActions} from "../../reducers/ui";


import TabbedPage from "../../presenters/TabbedPage";
import Graph from "../../presenters/Graph";

import NodeSidebar from "../NodeSidebar";
import NewEdgeModal from "../NewEdgeModal";
import UploadProjectModal from "../UploadProjectModal";

/* -----------------    COMPONENT     ------------------ */

class ProjectPage extends PureComponent {
	componentDidMount() {
		window.addEventListener("resize", this.props.handleResize);
		window.addEventListener("keydown", this.props.handleKeydown)
		window.addEventListener("keyup", this.props.handleKeyup)
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.props.handleResize)
		window.removeEventListener("keydown", this.props.handleKeydown)
		window.removeEventListener("keyup", this.props.handleKeyup)
	}

	render() {
		const {project, location} = this.props;
		return (
			<Fragment>
				<TabbedPage location={location}>
					{project.allGraphIds.map(gid => (
						<Graph key={"graph"+gid}
							id={gid}
							graph={project.graphsById[gid]}
						/>
					))}
				</TabbedPage>
				<NodeSidebar />
				<NewEdgeModal />
				<UploadProjectModal />
			</Fragment>
		)
	}
}

/* -----------------    CONTINER     ------------------ */

const mapState = ({location, project, ui}) => ({
	location,
	project,
	control: ui.control
});

const mapDispatch = {
	toggleControl: uiActions.toggleControl,
	handleResize: uiActions.windowChange
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	let spaceIsDown = false;
	return {
		...stateProps,
		...dispatchProps,
		...ownProps,
		handleKeydown(evt) {
			if (evt.keyCode !== 32 || spaceIsDown) return;
			dispatchProps.toggleControl({control: true});
			spaceIsDown = true;
		},
		handleKeyup(evt) {
			if (evt.keyCode !== 32 || !spaceIsDown) return;
			dispatchProps.toggleControl({control: false});
			spaceIsDown = false;
		}
	}
}

export default connect(mapState, mapDispatch, mergeProps)(ProjectPage);
