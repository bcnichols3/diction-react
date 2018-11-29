import React from "react";
import {connect} from "react-redux";

import {advanceModalPhase} from "../../reducers/ui";

import Navbar from "../../presenters/Navbar";

const PREFIX = "data:text/json;charset=utf-8,";

/* -----------------    COMPONENT     ------------------ */

const AppBar = (props) => {
	const {project, downloadJson, buildResponses, openUploadModal } = props;
	return (<Navbar>
		<h1 className="app-name">Diction</h1>
		<div className="button-container">
			<button className="upload-button"
				onClick={openUploadModal}>
				upload
			</button>
			<button className="save-button"
				onClick={() => downloadJson(project, "project")}>
				save
			</button>
			<button className="publish-button"
				onClick={() => downloadJson(buildResponses(project), "responses")}>
				publish
			</button>
		</div>
	</Navbar>)
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({project}) => ({
	project,
	downloadJson(json, name){
		const dataStr = PREFIX + encodeURIComponent(JSON.stringify(json));

		const downloadAnchorNode = document.createElement("a");
		downloadAnchorNode.setAttribute("href", dataStr);
		downloadAnchorNode.setAttribute("download", `${name}.json`);

		document.body.appendChild(downloadAnchorNode); // required for firefox
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	},
	buildResponses({graphsById, nodesById, allGraphIds}) {
		return allGraphIds.reduce((responses, gid) => {
			const {allNodeIds, name} = graphsById[gid];
			const graphName = name.toLowerCase();

			responses[graphName] = allNodeIds.reduce((res, nid) => {
				const curNode = nodesById[nid];

				if (curNode.type !== "response") return res;
				res[curNode.name] = [{speech: curNode.speech}]

				return res;
			}, {});

			return responses;
		}, {});
	}
})

const mapDispatch = dispatch => ({
	openUploadModal: (evt) => dispatch(advanceModalPhase({
		name: "uploadProject", phase: "closed"
	})),
})

export default connect(mapState, mapDispatch)(AppBar);
