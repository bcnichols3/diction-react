const newNodes = {
	request: {
		name: "intent",
	},
	response: {
		name: "newNode",
		speech: "",
		audio: []
	},
	link: {
		name: "New Link",
		message: ""
	},
	decision: {
		name: "",
	},
	comment: {
		name: "New Comment",
		message: ""
	}
}

function createId(type, length=10) {
	let id = type.slice(0,3);
	for (let i = 0; i < length; i++) {
		const num = Math.random() * (90 - 65) + 65;
		id += String.fromCharCode(num);
	}
	return id;
}

export function selectNode(newState, {nodeId}) {
	newState.selectedNodeId = nodeId;
}

export function createNode(newState, {type, parentId}) {
	const parentNode = newState.nodesById[parentId];
	const selectedGraph = newState.graphsById[parentNode.graphId];
	const {allNodeIds} = selectedGraph;

	// create node object
	const newNode = Object.assign({}, newNodes[type], {
		id: createId(type),
		type,
		parentId,
		graphId: parentNode.graphId,
		loc: {
			x: parentNode.loc.x,
			y: parentNode.loc.y + 200
		}
	});
	// create node edge object
	newState.edges[newNode.id] = {};

	// register node
	newState.allNodeIds = newState.allNodeIds.concat(newNode.id);
	newState.graphsById[selectedGraph.id] = Object.assign({},
		selectedGraph, {
			allNodeIds: allNodeIds.concat(newNode.id)
		}
	);
	newState.nodesById = Object.assign({}, newState.nodesById, {
		[newNode.id]: newNode
	});

	return newNode;
}

export function createNodeEdge(newState, {type, childId, parentId}) {
	if (type !== "comment") {
		if (!newState.edges[parentId]) newState.edges[parentId] = {}
		newState.edges[parentId][childId] = {
			label: "New Edge",
			childId,
			parentId
		};
		return newState.edges[parentId][childId];
	}
	return null;
}

export function deleteNodeEdge(newState, {childId, parentId}) {
	const edge = newState.edges[parentId][childId];
	delete newState.edges[parentId][childId];
	return edge;
}
