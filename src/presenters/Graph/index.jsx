import React, { PureComponent } from 'react';
import {connect} from 'react-redux';

import Node from './Node';
import Section from './Section';

/* -----------------    COMPONENT     ------------------ */

class Graph extends PureComponent {
    render() {
		const {graph} = this.props;
        return (
			<div className="graph-wrapper">
				{graph.allNodeIds.map(nodeId => (
					<Section>
						<Node nodeId={nodeId} />
					</Section>
				))}
			</div>
        );
    }
}

const mapState = ({project}) => ({
	graph: project.graphsById.welcome
});

export default connect(mapState)(Graph);
