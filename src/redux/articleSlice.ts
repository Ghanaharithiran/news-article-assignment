import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/articles";

// Define TypeScript Interface
interface Article {
  id: number;
  title: string;
  summary: string;
  date: string;
  publisher: string;
}

//  Define Initial State Type
interface ArticlesState {
  data: Article[];
}

// Fetch Articles Thunk
export const fetchArticles = createAsyncThunk<Article[]>("articles/fetchArticles", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Delete Article Thunk
export const deleteArticle = createAsyncThunk<number, number>("articles/deleteArticle", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// Initial State
const initialState: ArticlesState = {
  data: [],
};

// Redux Slice
const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action: PayloadAction<Article[]>) => {
      state.data = action.payload;
    });
    builder.addCase(deleteArticle.fulfilled, (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((article) => article.id !== action.payload);
    });
  },
});

export default articleSlice.reducer;
