const newNode = {
	decision: {
		name: ""
	},
	request: {
		name: "intent",
	},
	response: {
		name: "New Node",
		speech: "",
		audio: []
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

export default function createNode(type, parent, graph) {
	return Object.assign({}, newNode[type], {
		id: createId(type),
		type,
		parentId: parent.id,
		graphId: graph.id,
		loc: {
			x: parent.loc.x,
			y: parent.loc.y + 200
		}
	})
}
