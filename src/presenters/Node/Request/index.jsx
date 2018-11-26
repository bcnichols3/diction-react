import React from 'react';
import './style.scss';

/* -----------------    COMPONENT     ------------------ */

const RequestNode = (props) => {
	const {node, handleChange, className} = props;
	return (
		<div className={className}>
			<input type="text"
				className="node-name"
				value={node.name}
				placeholder="node name"
				onChange={handleChange}
			/>
		</div>
	)
}

export default RequestNode;
