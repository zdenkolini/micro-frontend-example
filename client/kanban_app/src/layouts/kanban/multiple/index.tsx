import React, { useEffect, useMemo } from "react";
import {
  generatePath,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router";
import { Link } from "react-router-dom";

import { IssueStatus } from "src/api/kanban";
import Routes from "src/constants/routes";
import { useAppDispatch, useAppSelector } from "src/store";
import { fetchAllIssues, selectIssues } from "src/store/slices/kanban";

import Issue from "./components/issue";
import styles from "./multiple_issues.module.scss";

interface MultipleIssuesProps {}

const statuses = [
  { label: "Doing", status: IssueStatus.DOING },
  { label: "In Progress", status: IssueStatus.IN_PROGRESS },
  { label: "Done", status: IssueStatus.DONE },
];

const MultipleIssues = ({}: MultipleIssuesProps): JSX.Element => {
  const { status } = useParams<{ status?: IssueStatus }>();
  const dispatch = useAppDispatch();
  const issues = useAppSelector(selectIssues);

  useEffect(() => {
    dispatch(fetchAllIssues({ status }));
  }, [status]);

  const memoedIssues = useMemo(
    () => ({
      [IssueStatus.DOING]: issues.filter(
        ({ status }) => status === IssueStatus.DOING
      ),
      [IssueStatus.IN_PROGRESS]: issues.filter(
        ({ status }) => status === IssueStatus.IN_PROGRESS
      ),
      [IssueStatus.DONE]: issues.filter(
        ({ status }) => status === IssueStatus.DONE
      ),
    }),
    [issues]
  );

  return (
    <div className={styles.swimlanes}>
      {typeof status !== "undefined" && (
        <Link to={Routes.KANBAN}>{"<"} Back</Link>
      )}
      {useMemo(
        () =>
          statuses
            .filter((s) => typeof status === "undefined" || s.status === status)
            .map((s) => (
              <div key={s.status}>
                <Link
                  to={generatePath(Routes.KANBAN_STATUS, { status: s.status })}
                >
                  <h2>{s.label}</h2>
                </Link>
                {memoedIssues[s.status].map((issue) => (
                  <Issue key={issue.id} {...issue} />
                ))}
              </div>
            )),
        [statuses, status, memoedIssues]
      )}
    </div>
  );
};

export default MultipleIssues;
