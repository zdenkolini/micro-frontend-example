import React from "react";
import loadable from "@loadable/component";

import Loading from "../../components/loading";

const Component = loadable(() => import("documents_app/App"), {
  fallback: <Loading />,
});

const DocumentsApp = (): JSX.Element => {
  return <Component />;
};

export default DocumentsApp;
