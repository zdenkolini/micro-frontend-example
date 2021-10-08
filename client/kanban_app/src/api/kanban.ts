import { AxiosResponse } from "axios";
import { generatePath } from "react-router";
import axiosInstance from ".";
import ServiceRoutes from "../constants/serviceRoutes";
import generateQuery from "../util/generateQuery";

export enum IssueStatus {
  DONE = "done",
  IN_PROGRESS = "in-progress",
  DOING = "doing",
}

export interface Issue {
  id: number;
  name: string;
  status: IssueStatus;
}

export type GetSingleIssueResponse = Issue | null;

export interface GetSingleIssueError {
  status: number;
  message: string;
}

export type GetKanbanBoardResponse = Issue[];

export interface GetKanbanBoardError {
  status: number;
  message: string;
}

const kanbanService = {
  getAll: (status?: IssueStatus) =>
    axiosInstance.get<never, AxiosResponse<GetKanbanBoardResponse>>(
      generateQuery(ServiceRoutes.ISSUES, { status })
    ),
  getOne: (id: number) =>
    axiosInstance.get<never, AxiosResponse<GetSingleIssueResponse>>(
      generatePath(ServiceRoutes.SINGLE_ISSUE, { id })
    ),
};

export default kanbanService;
