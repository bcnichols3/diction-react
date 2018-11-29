import React, {Fragment} from "react";

const types = {
	response: props => (<Fragment>
		<h6>Response</h6>
		<p>{`${props.graphId}.${props.name}`}</p>
	</Fragment>)
	,
	request: props => (<Fragment>
		<h6>Request</h6>
		<p>{`Intent: ${props.name}`}</p>
	</Fragment>)
	,
	decision: props => (<Fragment>
		<h6>Decision</h6>
	</Fragment>)
	,
	comment: props => (<Fragment>
		<h6>Comment</h6>
	</Fragment>)
}

const NodeInfo = (props) => {
	if (!props.type) return null;

	return types[props.type](props)
}

export default NodeInfo;
