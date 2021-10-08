import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "src/store";
import {
  fetchSingleDocument,
  selectSingleDocument,
} from "src/store/slices/documents";

interface SingleDocumentProps {}

const SingleDocument = ({}: SingleDocumentProps): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { text } = useAppSelector(selectSingleDocument);

  useEffect(() => {
    const idInt = parseInt(id);
    if (!Number.isNaN(idInt)) dispatch(fetchSingleDocument({ id: idInt }));
  }, [id]);

  return (
    <div>
      <h1>{text}</h1>
    </div>
  );
};

export default SingleDocument;
