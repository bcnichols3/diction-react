import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import './style.scss';

import {actions as projectActions} from '../../../reducers/project';

import Dropzone from 'react-dropzone';
import Decision from '../Decision';
import Connection from '../Connection';
import NodeText from './NodeText';

/* -----------------    COMPONENT     ------------------ */

class Node extends PureComponent {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleDrop = this.handleDrop.bind(this);
	}

	handleChange(evt) {
		const {updateNode, node} = this.props;
		const {classList, value} = evt.target;
		const CLASSES = Array.from(classList);
		let key = "name";
		if (CLASSES.includes("node-speech")) key = "speech";
		if (CLASSES.includes("node-reprompt")) key = "reprompt"

		const editedNode = Object.assign({}, node, {
			[key]: value
		});

		updateNode(editedNode);
	}

	handleDrop(acceptedFiles, rejectedFiles) {
		console.log('ACCEPTED', acceptedFiles, "REJECTED", rejectedFiles);
	}

    render() {
		const {node, connections, allConnectedNodeIds} = this.props;

        return (
			<div className="node-wrapper">
				<div className="node-container">
					<input type="text"
						className="node-name"
						value={node.name}
						placeholder="node name"
						onChange={this.handleChange}
					/>
					<NodeText type="speech"
						attributes={{
							value: node.speech,
							onChange: this.handleChange
						}}
					/>
					<NodeText type="reprompt"
						attributes={{
							value: node.reprompt,
							onChange: this.handleChange
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
					<Connection
						key={node.id + connectedNodeId}
						origId={node.id}
						destId={connectedNodeId}
						{...connections[connectedNodeId]}
					/>
				))}
			</div>
        );
    }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({project}, {nodeId}) => ({
	node: project.nodesById[nodeId],
	connections: project.connections[nodeId],
	allConnectedNodeIds: Object.keys(project.connections[nodeId] || {})
});

const mapDispatch = {
	updateNode: projectActions.updateNode
}

export default connect(mapState, mapDispatch)(Node);
