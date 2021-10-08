import React, { useEffect } from "react";
import { useLocation, useParams, useRouteMatch } from "react-router";
import { useAppDispatch, useAppSelector } from "src/store";
import { fetchSingleIssue, selectSingleIssue } from "src/store/slices/kanban";

interface SingleIssueProps {}

const SingleIssue = ({}: SingleIssueProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { name, status } = useAppSelector(selectSingleIssue);

  useEffect(() => {
    const idInt = parseInt(id);
    if (!Number.isNaN(idInt)) dispatch(fetchSingleIssue({ id: idInt }));
  }, [id]);

  return (
    <div>
      <h1>{name}</h1>
      <h3>{status}</h3>
    </div>
  );
};

export default SingleIssue;
