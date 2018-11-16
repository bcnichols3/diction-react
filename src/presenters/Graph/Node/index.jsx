import React, { PureComponent } from 'react';
import {connect} from 'react-redux';

import {actions as projectActions} from '../../../reducers/project';

import Dropzone from 'react-dropzone';
import AddButton from '../AddButton';

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
		const key = Array.from(classList).includes("node-speech")
			? "speech" : "reprompt";

		const editedNode = Object.assign({}, node, {
			[key]: value
		});

		updateNode(editedNode);
	}

	handleDrop(acceptedFiles, rejectedFiles) {
		console.log('ACCEPTED', acceptedFiles, "REJECTED", rejectedFiles);
	}

    render() {
		const {node} = this.props;

        return (
			<div className="node-wrapper">
				<div className="node-container">
					<input type="text"
						className="node-name"
						value={node.name}
						onChange={this.handleChange}
					/>
					<input type="text"
						className="node-text node-speech"
						value={node.speech}
						onChange={this.handleChange}
					/>
					<input type="text"
						className="node-text node-reprompt"
						value={node.reprompt}
						onChange={this.handleChange}
					/>
					<Dropzone className="node-drop"
						accept="audio/mp3, audio/wav"
						onDrop={this.handleDrop}>
						Add Audio
					</Dropzone>
				</div>
				<AddButton />
			</div>
        );
    }
}

const mapState = ({project}, {nodeId}) => ({
	node: project.nodesById[nodeId]
});

const mapDispatch = {
	updateNode: projectActions.updateNode
}

export default connect(mapState, mapDispatch)(Node);
