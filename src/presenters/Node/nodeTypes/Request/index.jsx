import React from 'react';
import './style.scss';

import NodeDrag from "../../NodeDrag";

/* -----------------    COMPONENT     ------------------ */

const RequestNode = (props) => {
	const {node, handleChange, className} = props;
	return (
		<div className={className}>
			<NodeDrag {...props}/>
			<input type="text"
				data-keystring="name"
				className="node-name"
				value={node.name}
				placeholder="node name"
				onChange={handleChange}
			/>
		</div>
	)
}

export default RequestNode;
