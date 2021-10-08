import React from "react";
import { generatePath, Link } from "react-router-dom";
import { Issue as IssueInterface } from "src/api/kanban";
import Routes from "src/constants/routes";

import styles from "./issue.module.scss";

interface IssueProps extends IssueInterface {}

const Issue = ({ id, name, status }: IssueProps): JSX.Element => {
  return (
    <Link
      to={generatePath(Routes.KANBAN_ISSUE_DETAILS, { id })}
      className={styles.issue}
    >
      <h3>{name}</h3>
      <p>{status}</p>
    </Link>
  );
};

export default Issue;
