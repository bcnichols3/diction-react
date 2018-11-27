import React, { Component, Fragment } from "react";
import { Provider } from "react-redux";

import store from "./store";

import ProjectPage from "./containers/ProjectPage";
import Appbar from "./presenters/Appbar";

/* -----------------    COMPONENT     ------------------ */

export default class App extends Component {
    render() {
        return (
			<Provider store={store}>
				<Fragment>
					<Appbar />
					<ProjectPage />
				</Fragment>
			</Provider>
        );
    }
}
