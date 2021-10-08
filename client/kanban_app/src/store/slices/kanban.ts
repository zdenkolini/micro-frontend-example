import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import kanbanService, {
  Issue,
  IssueStatus,
  GetKanbanBoardError,
  GetKanbanBoardResponse,
  GetSingleIssueError,
  GetSingleIssueResponse,
} from "src/api/kanban";
import LoadingStatus from "src/constants/loadingState";
import { RootState } from "..";

const SLICE_NAME = "kanban";

export interface DocumentsState {
  issues: Issue[];
  issuesStatus: LoadingStatus;
  issuesError: GetKanbanBoardError | null;
  singleIssue: Partial<Issue>;
  singleIssueStatus: LoadingStatus;
  singleIssueError: GetSingleIssueError | null;
}

const initialState: DocumentsState = {
  issues: [],
  issuesStatus: LoadingStatus.INITIALIZED,
  issuesError: null,
  singleIssue: {},
  singleIssueStatus: LoadingStatus.INITIALIZED,
  singleIssueError: null,
};

export const fetchAllIssues = createAsyncThunk<
  GetKanbanBoardResponse,
  { status?: IssueStatus },
  { state: RootState; rejectValue: GetKanbanBoardError }
>(`${SLICE_NAME}/fetchAllIssues`, async ({ status }, { rejectWithValue }) => {
  try {
    return (await kanbanService.getAll(status)).data;
  } catch (e) {
    const error = e as GetKanbanBoardError;
    return rejectWithValue(error);
  }
});

export const fetchSingleIssue = createAsyncThunk<
  GetSingleIssueResponse,
  { id: number },
  { state: RootState; rejectValue: GetSingleIssueError }
>(`${SLICE_NAME}/fetchSingleIssue`, async ({ id }, { rejectWithValue }) => {
  try {
    return (await kanbanService.getOne(id)).data;
  } catch (e) {
    const error = e as GetSingleIssueError;
    return rejectWithValue(error);
  }
});

export const kanbanSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllIssues.pending, (state) => {
        state.issuesStatus = LoadingStatus.LOADING;
        state.issuesError = null;
        state.issues = [];
      })
      .addCase(fetchAllIssues.fulfilled, (state, { payload }) => {
        state.issuesStatus = LoadingStatus.READY;
        state.issues = payload;
      })
      .addCase(fetchAllIssues.rejected, (state, { payload }) => {
        state.issuesStatus = LoadingStatus.READY;
        state.issuesError = payload!;
      });

    builder
      .addCase(fetchSingleIssue.pending, (state) => {
        state.singleIssueStatus = LoadingStatus.LOADING;
        state.singleIssueError = null;
        state.singleIssue = {};
      })
      .addCase(fetchSingleIssue.fulfilled, (state, { payload }) => {
        state.singleIssueStatus = LoadingStatus.READY;
        state.singleIssue = payload || {};
      })
      .addCase(fetchSingleIssue.rejected, (state, { payload }) => {
        state.singleIssueStatus = LoadingStatus.READY;
        state.singleIssueError = payload!;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = kanbanSlice.actions;

export const selectIssues = (state: RootState) => state.kanban.issues;
export const selectIssuesStatus = (state: RootState) =>
  state.kanban.issuesStatus;
export const selectIssuesError = (state: RootState) =>
  state.kanban.issuesStatus;
export const selectSingleIssue = (state: RootState) => state.kanban.singleIssue;
export const selectSingleIssueStatus = (state: RootState) =>
  state.kanban.singleIssueStatus;
export const selectSingleSingleIssueError = (state: RootState) =>
  state.kanban.singleIssueError;

export default kanbanSlice.reducer;
