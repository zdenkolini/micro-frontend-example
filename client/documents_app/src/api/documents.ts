import { AxiosResponse } from "axios";
import { generatePath } from "react-router";
import axiosInstance from ".";
import ServiceRoutes from "../constants/serviceRoutes";

export interface Document {
  id: number;
  text: string;
}

export type GetSingleDocumentsResponse = Document | null;

export interface GetSingleDocumentsError {
  status: number;
  message: string;
}

export type GetAllDocumentsResponse = Document[];

export interface GetAllDocumentsError {
  status: number;
  message: string;
}

const documentsService = {
  getAll: () =>
    axiosInstance.get<never, AxiosResponse<GetAllDocumentsResponse>>(
      ServiceRoutes.DOCUMENTS
    ),
  getOne: (id: number) =>
    axiosInstance.get<never, AxiosResponse<GetSingleDocumentsResponse>>(
      generatePath(ServiceRoutes.SINGLE_DOCUMENT, { id })
    ),
};

export default documentsService;
