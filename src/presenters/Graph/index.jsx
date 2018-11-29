import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import "./style.scss";

import {actions as projectActions} from "../../reducers/project";
import {actions as uiActions} from "../../reducers/ui";

import Node from '../Node';
import Edge from "../Edge";


/* -----------------    COMPONENT     ------------------ */

class Graph extends PureComponent {
	componentDidMount() {
		this.listener = window.addEventListener("resize", this.props.handleResize);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.props.handleResize)
	}

	render() {
		const {graph, edges, nodesById, handleClick} = this.props;

		return (
			<div className="graph-wrapper" onClick={handleClick}>
				{graph.allNodeIds.map((nodeId, idx) => (
					<Node key={nodeId} node={nodesById[nodeId]} />
				))}
				{graph.allNodeIds.map(origId => {
					if (!edges[origId]) return null;
					return Object.keys(edges[origId]).map(destId => (
						<Edge key={origId + destId}
							origId={origId}
							destId={destId}
						/>
					))
				})}
			</div>
		)
	}
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({project}, {data}) => {
	// const graph = project.graphsById[project.selectedGraphId];
	return {
		graph: data,
		edges: project.edges,
		nodesById: project.nodesById
	}
}

const mapDispatch = (dispatch => ({
	handleResize(evt) {
		dispatch(uiActions.windowChange());
	},
	handleClick(evt) {
		dispatch(projectActions.selectNode({nodeId: null}))
	}
}))

export default connect(mapState, mapDispatch)(Graph);
