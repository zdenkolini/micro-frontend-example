import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import documentsService, {
  GetAllDocumentsError,
  GetAllDocumentsResponse,
  Document,
  GetSingleDocumentsResponse,
  GetSingleDocumentsError,
} from "src/api/documents";
import LoadingStatus from "src/constants/loadingState";
import { RootState } from "..";

const SLICE_NAME = "documents";

export interface DocumentsState {
  documents: Document[];
  documentsStatus: LoadingStatus;
  documentsError: GetAllDocumentsError | null;
  singleDocument: Partial<Document>;
  singleDocumentStatus: LoadingStatus;
  singleDocumentError: GetAllDocumentsError | null;
}

const initialState: DocumentsState = {
  documents: [],
  documentsStatus: LoadingStatus.INITIALIZED,
  documentsError: null,
  singleDocument: {},
  singleDocumentStatus: LoadingStatus.INITIALIZED,
  singleDocumentError: null,
};

export const fetchAllDocuments = createAsyncThunk<
  GetAllDocumentsResponse,
  undefined,
  { state: RootState; rejectValue: GetAllDocumentsError }
>(`${SLICE_NAME}/fetchAllDocuments`, async (_, { rejectWithValue }) => {
  try {
    return (await documentsService.getAll()).data;
  } catch (e) {
    const error = e as GetAllDocumentsError;
    return rejectWithValue(error);
  }
});

export const fetchSingleDocument = createAsyncThunk<
  GetSingleDocumentsResponse,
  { id: number },
  { state: RootState; rejectValue: GetSingleDocumentsError }
>(`${SLICE_NAME}/fetchSingleDocument`, async ({ id }, { rejectWithValue }) => {
  try {
    return (await documentsService.getOne(id)).data;
  } catch (e) {
    const error = e as GetSingleDocumentsError;
    return rejectWithValue(error);
  }
});

export const documentsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDocuments.pending, (state) => {
        state.documentsStatus = LoadingStatus.LOADING;
        state.documentsError = null;
        state.documents = [];
      })
      .addCase(fetchAllDocuments.fulfilled, (state, { payload }) => {
        state.documentsStatus = LoadingStatus.READY;
        state.documents = payload;
      })
      .addCase(fetchAllDocuments.rejected, (state, { payload }) => {
        state.documentsStatus = LoadingStatus.READY;
        state.documentsError = payload!;
      });

    builder
      .addCase(fetchSingleDocument.pending, (state) => {
        state.singleDocumentStatus = LoadingStatus.LOADING;
        state.singleDocumentError = null;
        state.singleDocument = {};
      })
      .addCase(fetchSingleDocument.fulfilled, (state, { payload }) => {
        state.singleDocumentStatus = LoadingStatus.READY;
        state.singleDocument = payload || {};
      })
      .addCase(fetchSingleDocument.rejected, (state, { payload }) => {
        state.singleDocumentStatus = LoadingStatus.READY;
        state.singleDocumentError = payload!;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = documentsSlice.actions;

export const selectDocuments = (state: RootState) => state.documents.documents;
export const selectDocumentsStatus = (state: RootState) =>
  state.documents.documentsStatus;
export const selectDocumentsError = (state: RootState) =>
  state.documents.documentsError;
export const selectSingleDocument = (state: RootState) =>
  state.documents.singleDocument;
export const selectSingleDocumentStatus = (state: RootState) =>
  state.documents.singleDocumentStatus;
export const selectSingleDocumentError = (state: RootState) =>
  state.documents.singleDocumentError;

export default documentsSlice.reducer;
