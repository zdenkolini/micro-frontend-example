import React from "react";
import { generatePath, Link, Redirect, Route, Switch } from "react-router-dom";

import { useAppSelector } from "./store";

import Login from "./layouts/login";
import Dashboard from "./layouts/dashboard";
import Routes from "./constants/routes";
import DocumentsApp from "./apps/documents";
import KanbanApp from "./apps/kanban";

function App(): JSX.Element {
  const count = useAppSelector((state) => state.test.value);

  return (
    <Switch>
      <Route path={Routes.LOGIN}>
        <Login />
      </Route>
      <Route path={Routes.DASHBOARD} exact>
        <Redirect to={Routes.DOCUMENTS} />
      </Route>
      <Route path={Routes.DASHBOARD}>
        <Dashboard>
          <Route path={Routes.DOCUMENTS}>
            <DocumentsApp />
          </Route>
          <Route path={Routes.KANBAN}>
            <KanbanApp />
          </Route>
        </Dashboard>
      </Route>
    </Switch>
  );
}

export default App;
