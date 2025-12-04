import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchRecipesByKeyword,
  fetchRecipesByIngredients,
  fetchRecipeDetails,
} from "../api/recipeApi";

export const getRecipesByKeyword = createAsyncThunk(
  "recipes/byKeyword",
  async (keyword) => await fetchRecipesByKeyword(keyword)
);

export const getRecipesByIngredients = createAsyncThunk(
  "recipes/byIngredients",
  async (ingredients) => await fetchRecipesByIngredients(ingredients)
);

export const getRecipeDetails = createAsyncThunk(
  "recipes/details",
  async (id) => await fetchRecipeDetails(id)
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    list: [],
    details: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecipesByKeyword.pending, (s) => { s.loading = true; })
      .addCase(getRecipesByKeyword.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload;
      })
      .addCase(getRecipesByIngredients.pending, (s) => { s.loading = true; })
      .addCase(getRecipesByIngredients.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload;
      })
      .addCase(getRecipeDetails.pending, (s) => { s.loading = true; })
      .addCase(getRecipeDetails.fulfilled, (s, a) => {
        s.loading = false;
        s.details = a.payload;
      });
  }
});

export default recipesSlice.reducer;