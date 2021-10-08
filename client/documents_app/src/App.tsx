import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import Routes from "./constants/routes";
import MultipleDocuments from "./layouts/documents/multiple";
import SingleDocument from "./layouts/documents/single";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Switch>
        <Route path={Routes.DOCUMENTS} exact>
          <MultipleDocuments />
        </Route>
        <Route path={Routes.DOCUMENT_DETAILS}>
          <SingleDocument />
        </Route>
      </Switch>
    </Provider>
  );
}

export default App;
