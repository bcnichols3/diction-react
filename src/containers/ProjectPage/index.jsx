import React, {Fragment} from "react";
import {connect} from "react-redux";

import TabbedPage from "../../presenters/TabbedPage";
import Graph from "../../presenters/Graph";
import NodeSidebar from "../NodeSidebar";

import NewEdgeModal from "../NewEdgeModal";
import UploadProjectModal from "../UploadProjectModal";

/* -----------------    COMPONENT     ------------------ */

const ProjectPage = ({project, modalPhases, location}) => (
	<Fragment>
		<TabbedPage location={location}>
			{project.allGraphIds.map(gid => (
				<Graph key={"graph"+gid}
					id={gid}
					data={project.graphsById[gid]}
				/>
			))}
		</TabbedPage>
		<NodeSidebar />
		<NewEdgeModal phase={modalPhases.newEdge}/>
		<UploadProjectModal phase={modalPhases.uploadProject}/>
	</Fragment>
)

/* -----------------    CONTINER     ------------------ */

const mapState = ({project, ui, location}) => ({
	location,
	modalPhases: ui.modalPhases,
	project
});

export default connect(mapState)(ProjectPage);
