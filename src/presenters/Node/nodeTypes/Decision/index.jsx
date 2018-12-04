import React from "react";
import "./style.scss";

import NodeDrag from "../../NodeDrag";

/* -----------------    COMPONENT     ------------------ */

const Decision = (props) => (
	<div className={props.className} >
		<NodeDrag {...props}/>
	</div>
);

export default Decision;
