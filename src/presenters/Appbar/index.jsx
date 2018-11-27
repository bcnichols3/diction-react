import React from "react";
import {connect} from "react-redux";
import "./style.scss";

const PREFIX = "data:text/json;charset=utf-8,";

/* -----------------    COMPONENT     ------------------ */

const Appbar = (props) => (
	<div className="appbar">
		<h1 className="app-name">Diction</h1>
		<button className="download-button" onClick={props.downloadAsJson}>
			Download
		</button>
	</div>
)

/* -----------------    CONTAINER     ------------------ */

const mapState = ({project}) => ({
	downloadAsJson(){
		const json = makeResponseFromProject(project);
		const dataStr = PREFIX + encodeURIComponent(JSON.stringify(json));

		const downloadAnchorNode = document.createElement("a");
		downloadAnchorNode.setAttribute("href", dataStr);
		downloadAnchorNode.setAttribute("download", "responses.json");

		document.body.appendChild(downloadAnchorNode); // required for firefox
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	}
})

function makeResponseFromProject(project) {
	const {graphsById, nodesById} = project;
	return project.allGraphIds.reduce((responses, gid) => {
		const curGraph = graphsById[gid];
		const graphName = curGraph.name.toLowerCase();

		responses[graphName] = curGraph.allNodeIds.reduce((res, nid) => {
			const curNode = nodesById[nid];

			if (curNode.type !== "response") return res;
			res[curNode.name] = [{speech: curNode.speech}]

			return res;
		}, {});

		return responses;
	}, {})
}

export default connect(mapState)(Appbar);
