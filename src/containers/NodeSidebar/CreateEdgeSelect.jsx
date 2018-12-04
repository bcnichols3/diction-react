import React, {Fragment} from "react";

/* -----------------    COMPONENT     ------------------ */

const CreateEdgeSelect = (props) => {
	const {selectedNode, nodesById, handleCreateEdge} = props;

	if (!selectedNode) return null;

	const SUITABLE_CONNECTIONS = getSuitableConnections(props);

	if  (!SUITABLE_CONNECTIONS.length) {
		return <h6>No Connectable Nodes</h6>;
	} else if (SUITABLE_CONNECTIONS.length < 1 || selectedNode.type === "decision") {
		return (<Fragment>
			<h6 className="section-hed">Add Connection</h6>
			<select onChange={handleCreateEdge}>
				{SUITABLE_CONNECTIONS.map(id => {
					console.log('ID', id, "NODES BY ID", nodesById);
					return (
						<option key={"sidebar-option-"+id} value={id}>
							{nodesById[id].name}
						</option>
					)
				})}
			</select>
		</Fragment>)
	} else {
		return <h6>No Connectable Nodes</h6>;
	}
}

/* -----------------    FILTER     ------------------ */

function getSuitableConnections(props) {
	const {selectedNode, allNodeIds, nodesById, edges} = props;

	return allNodeIds.filter((id) => {
		const curNode = nodesById[id];
		const IS_SELF = id === selectedNode.id;
		const ALREADY_CONNECTED = edges[selectedNode.id]
			&& edges[selectedNode.id][id];
		const DIFFERENT_GRAPH = curNode.graphId !== selectedNode.graphId;

		if (IS_SELF || ALREADY_CONNECTED || DIFFERENT_GRAPH) {
			return false;
		}
		// const allConnectedNodeIds = Object.keys(edges[selectedNode.id])
		switch (curNode.type) {
			case "request":
				return curNode.name !== "launch"
			;
			default:
				return true;
		}
	});
}

export default CreateEdgeSelect;
