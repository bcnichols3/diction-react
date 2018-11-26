import React, { PureComponent, Fragment } from 'react';
import './style.scss';

import Dropzone from 'react-dropzone';
import Decision from '../Decision';
import Edge from '../Edge';
import NodeText from '../NodeText';

/* -----------------    COMPONENT     ------------------ */

class ResponseNode extends PureComponent {
	constructor(props) {
		super(props);

		this.handleDrop = this.handleDrop.bind(this);
	}

	handleDrop(acceptedFiles, rejectedFiles) {
		console.log('ACCEPTED', acceptedFiles, "REJECTED", rejectedFiles);
	}

    render() {
		const {node, edges, allConnectedNodeIds} = this.props;

        return (
			<Fragment>
				<div className="node-container">
					<input type="text"
						className="node-name"
						value={node.name}
						placeholder="node name"
						onChange={this.props.handleChange}
					/>
					<NodeText type="speech"
						attributes={{
							value: node.speech,
							onChange: this.props.handleChange
						}}
					/>
					<NodeText type="reprompt"
						attributes={{
							value: node.reprompt,
							onChange: this.props.handleChange
						}}
					/>
					<Dropzone className="node-drop"
						accept="audio/mp3, audio/wav"
						onDrop={this.handleDrop}>
						Add Audio
					</Dropzone>
				</div>
				<Decision node={node}/>
				{allConnectedNodeIds.map(connectedNodeId => (
					<Edge
						key={node.id + connectedNodeId}
						origId={node.id}
						destId={connectedNodeId}
						{...edges[connectedNodeId]}
					/>
				))}
			</Fragment>
        );
    }
}

export default ResponseNode;
