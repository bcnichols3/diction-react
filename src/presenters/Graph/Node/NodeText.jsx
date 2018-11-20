import React from "react";

/* -----------------    COMPONENT     ------------------ */

const NodeText = ({type, attributes}) => (
	<textarea
		className={`node-text node-${type}`}
		placeholder={type}
		wrap="soft"
		autoComplete="off"
		style={{ height: getHeight(attributes.value) }}
		{...attributes}
	/>
);

function getHeight(value) {
	console.log('VALUE', value.length / 28);
	return (4 + Math.ceil(value.length / 28) * 22) + "px";
}

export default NodeText;
