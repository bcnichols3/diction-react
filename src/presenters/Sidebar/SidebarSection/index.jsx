import React from "react";

const SidebarSection = (props) => (
	<div className={`sidebar-section ${props.className}`}>
		{props.children}
	</div>
)

export default SidebarSection;
