enum Routes {
  LOGIN = "/login",
  DASHBOARD = "/",
  DOCUMENTS = "/documents",
  DOCUMENT_DETAILS = "/documents/:id",
  KANBAN = "/kanban",
  KANBAN_ISSUE_DETAILS = "/kanban/:id(\\d+)",
  KANBAN_STATUS = "/kanban/:status(done|in-progress|doing)",
}

export default Routes;
