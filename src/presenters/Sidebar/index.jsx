import React from "react";
import "./style.scss";

import classNames from "classnames";

import SidebarSection from "./SidebarSection";

/* -----------------    COMPONENT     ------------------ */

const SidebarWrapper = ({open, allNodeIds, nodesById, children}) => {
	const CLASS_NAME = classNames("sidebar-wrapper", {open});

	return (
		<div className={CLASS_NAME}>
			<div className="sidebar-container">
				{children}
			</div>
		</div>
	);
}

/* -----------------    LIBRARY     ------------------ */

export default {
	Wrapper: SidebarWrapper,
	Section: SidebarSection
}
