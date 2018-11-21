import React from 'react';
import {connect} from 'react-redux';

import Node from './Node';
import Section from './Section';

/* -----------------    COMPONENT     ------------------ */

const Graph = ({graphName, sections}) => {
	return (
		<div className="graph-wrapper">
			<h1>{graphName}</h1>
			{sections.map(section => (
				<Section key={section.id}>
					{section.allNodeIds.map(nodeId => (
						<Node key={nodeId} nodeId={nodeId} />
					))}
				</Section>
			))}
		</div>
	)
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({project, ui}) => {
	const graph = project.graphsById[project.selectedGraphId];
	return {
		graphName: graph.name,
		sections: graph.allSectionIds.map(sectionId => ({
			id: sectionId,
			allNodeIds: graph.allNodeIds.filter(nodeId => {
				return project.nodesById[nodeId].sectionId === sectionId
			})
		}))
	}
}

export default connect(mapState)(Graph);
