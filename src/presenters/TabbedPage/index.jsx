import React, {Children, Fragment} from "react";
import "./style.scss";

import classNames from "classnames";

// import Page from "../Page";
import Navbar from "../Navbar";

import Tab from "./Tab";

/* -----------------    COMPONENT     ------------------ */

const TabbedPage = ({location, children, tabs}) => {
	const isOpen = id => location.pathname.includes(`${id}`);

	const tabIds = [];
	const WrappedChildren = Children.map(children, child => {
		const { id } = child.props;
		tabIds.push(id);
		const CLASS_NAMES = classNames("tab-content", {open: isOpen(id)})
		return (
			<div className={CLASS_NAMES}>
				{child}
			</div>
		)
	});

	return (
		<Fragment>
			<Navbar className="tab-nav">
				{tabIds.map(tabId => (
					<Tab key={"tab"+tabId}
						id={tabId}
						open={isOpen(tabId)} >
						{tabId}
					</Tab>
				))}
			</Navbar>
			<div className="tabbed-page-wrapper">
				{WrappedChildren}
			</div>
		</Fragment>
	);
}

export default TabbedPage;
