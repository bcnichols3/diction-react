import React, {Fragment} from "react";

import CreateEdgeSelect from "./CreateEdgeSelect";

import nodeTypes from "../../presenters/Node/nodeTypes";
const nodeTypeStrings = Object.keys(nodeTypes);

/* -----------------    COMPONENT     ------------------ */

const CreateNodeButtons = (props) => {
	const {selectedNode, edges, handleCreateNode} = props;

	if (!selectedNode) return null;

	const SUITABLE_TYPES = getSuitableNodes(props);
	const CONNECTIONS = Object.keys(edges[selectedNode.id]);

	return (CONNECTIONS.length > 1 && selectedNode.type !== "decision")
		? null
		: (<Fragment>
			<CreateEdgeSelect {...props} />
			{SUITABLE_TYPES.map(str => (
				<button key={str} data-type={str}
					onClick={handleCreateNode}>
					{`New ${str}`}
				</button>
			))}
		</Fragment>)
	;
}

/* -----------------    FILTER     ------------------ */

function getSuitableNodes({selectedNode, edges}) {
	return nodeTypeStrings.filter(curType => {
		if (!selectedNode) return false;
		const HAS_CONNECTION = Object.keys(edges[selectedNode.id]).length;

		switch (selectedNode.type) {
			case "request":
				if (HAS_CONNECTION) return curType === "comment";
				return curType !== "request";
			case "response":
				if (selectedNode.reprompt) return curType !== "response";
				return true;
			case "decision":
				return curType !== "request";
			case "link":
				return false;
			default:
				return true;
		}
	})
}

export default CreateNodeButtons;
