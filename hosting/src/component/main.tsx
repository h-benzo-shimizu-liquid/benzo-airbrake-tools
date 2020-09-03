
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as React from "react";
import {
	BrowserRouter,
	Switch,
	Route,
} from "react-router-dom";
import * as ReactRedux from "react-redux";
import { store, } from "@client/redux/store";
import ComponentTemplate from "@client/component/template";
import ComponentPageTop from "@client/component/pageTop";
import ComponentPageGetCsv from "@client/component/pageGetCsv";

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

const Component: React.FunctionComponent<{}> = ({}): JSX.Element => {
	return (
		<ReactRedux.Provider store = {store}>
			<BrowserRouter>
				<Switch>
					<Route path="/getCsv" component={ComponentPageGetCsv} />
					<Route path="/template" component={ComponentTemplate} />
					<Route component={ComponentPageTop} />
				</Switch>
			</BrowserRouter>
		</ReactRedux.Provider>
	);
};

export default Component;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

