import React, { Component, Fragment } from "react";
import { Provider } from "react-redux";

import store from "./store";

import ProjectPage from "./containers/ProjectPage";
import AppBar from "./containers/NodeAppBar";

/* -----------------    COMPONENT     ------------------ */

export default class App extends Component {
    render() {
        return (
			<Provider store={store}>
				<Fragment>
					<AppBar />
					<ProjectPage />
				</Fragment>
			</Provider>
        );
    }
}
