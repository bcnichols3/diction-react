import React, { Fragment } from 'react';
import './style.scss';

import Decision from '../Decision';
import Edge from '../Edge';

/* -----------------    COMPONENT     ------------------ */

const RequestNode = ({node, connections, allConnectedNodeIds}) => (
	<Fragment>
		<div className="node-container">
			<input type="text"
				className="node-name"
				value={node.name}
				placeholder="node name"
				onChange={this.props.handleChange}
			/>
		</div>
		<Decision node={node}/>
		{allConnectedNodeIds.map(connectedNodeId => (
			<Edge
			key={node.id + connectedNodeId}
			origId={node.id}
			destId={connectedNodeId}
			{...connections[connectedNodeId]}
			/>
		))}
	</Fragment>
)

export default RequestNode;
