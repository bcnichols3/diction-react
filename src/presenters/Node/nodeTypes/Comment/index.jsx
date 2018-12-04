import React from "react";
import "./style.scss";

import NodeText from "../../NodeText";

/* -----------------    COMPONENT     ------------------ */

const Comment = (props) => {
	const {node, handleChange, className} = props;

	return (<div className={className}>
		<div className="node-comment">
			<NodeText type="message"
				data-keystring="message"
				attributes={{
					value: node.message,
					onChange: handleChange
				}}
			/>
		</div>
	</div>)
}

export default Comment;
