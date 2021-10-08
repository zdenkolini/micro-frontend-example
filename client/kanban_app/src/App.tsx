import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import Routes from "./constants/routes";
import MultipleIssues from "./layouts/kanban/multiple";
import SingleIssue from "./layouts/kanban/single";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Switch>
        <Route path={Routes.KANBAN_ISSUE_DETAILS}>
          <SingleIssue />
        </Route>
        <Route path={[Routes.KANBAN_STATUS, Routes.KANBAN]}>
          <MultipleIssues />
        </Route>
      </Switch>
    </Provider>
  );
}

export default App;
