import React, { useEffect, useState } from "react";
import documentsService, { GetAllDocumentsResponse } from "src/api/documents";
import { useAppDispatch, useAppSelector } from "src/store";
import { fetchAllDocuments, selectDocuments } from "src/store/slices/documents";

import DocumentCard from "./components/document";
import styles from "./multiple.module.scss";

interface MultipleDocumentsProps {}

const MultipleDocuments = ({}: MultipleDocumentsProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const documents = useAppSelector(selectDocuments);

  useEffect(() => {
    dispatch(fetchAllDocuments());
  }, []);

  return (
    <div className={styles.documents_list}>
      {documents.map((doc) => (
        <DocumentCard key={doc.id} id={doc.id} text={doc.text} />
      ))}
    </div>
  );
};

export default MultipleDocuments;
