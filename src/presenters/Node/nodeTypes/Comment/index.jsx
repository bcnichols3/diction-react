import React from "react";
import "./style.scss";

import NodeText from "../../NodeText";
import NodeDrag from "../../NodeDrag";

/* -----------------    COMPONENT     ------------------ */

const Comment = (props) => {
	const {handleChange, className, node} = props;
	return (<div className={className}>
		<div className="node-comment">
			<NodeDrag {...props}/>
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
