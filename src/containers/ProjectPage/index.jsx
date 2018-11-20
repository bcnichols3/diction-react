import React, {Fragment} from "react";
import {connect} from "react-redux";

import Graph from "../../presenters/Graph";

import NewConnectionModal from "../NewConnectionModal";

/* -----------------    COMPONENT     ------------------ */

const ProjectPage = ({project, newConnModalPhase}) => (
	<Fragment>
		{newConnModalPhase !== 'closed'
			? <NewConnectionModal phase={newConnModalPhase}/>
		: null}
		<Graph data={project.graphsById.welcome} />
	</Fragment>
)

/* -----------------    CONTINER     ------------------ */

const mapState = ({project, ui}) => ({
	newConnModalPhase: ui.modalPhases.newConnection,
	project
});

export default connect(mapState)(ProjectPage);