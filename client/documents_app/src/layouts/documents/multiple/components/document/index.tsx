import React from "react";
import { generatePath } from "react-router";
import { Link } from "react-router-dom";
import { Document } from "src/api/documents";
import Routes from "src/constants/routes";

import styles from "./document.module.scss";

interface DocumentProps extends Document {}

const DocumentCard = ({ id, text }: DocumentProps): JSX.Element => {
  return (
    <Link
      to={generatePath(Routes.DOCUMENT_DETAILS, { id })}
      className={styles.document}
    >
      {text}
    </Link>
  );
};

export default DocumentCard;
