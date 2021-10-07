import React from "react";
import loadable from "@loadable/component";

import Loading from "../../components/loading";

const Component = loadable(() => import("kanban_app/App"), {
  fallback: <Loading />,
});

const KanbanApp = (): JSX.Element => {
  return <Component />;
};

export default KanbanApp;
