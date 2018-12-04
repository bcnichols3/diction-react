import React from 'react';
import './style.scss';

// import {NavLink} from "redux-first-router-link";
import NodeDrag from "../../NodeDrag";

import StarSVG from "../../../../assets/svg/StarSVG";

/* -----------------    COMPONENT     ------------------ */

const LinkNode = (props) => {
	const {node, className} = props;
	return (
		// <NavLink to={`/${node.linkId}`}>
			<div className={className}>
				<NodeDrag {...props}/>
				<StarSVG className={className} />
				{node.linkId}
			</div>
		// </NavLink>
	)
}

export default LinkNode;
