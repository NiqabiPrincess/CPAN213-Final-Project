import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const r = action.payload;
      const id = String(r.id);
      const exists = state.items.some((x) => String(x.id) === id);
      if (!exists) state.items.push({ ...r, id });
    },
    removeFavorite: (state, action) => {
      const id = String(action.payload);
      state.items = state.items.filter((x) => String(x.id) !== id);
    },
    toggleFavorite: (state, action) => {
      const r = action.payload;
      const id = String(r.id);
      const exists = state.items.some((x) => String(x.id) === id);
      state.items = exists
        ? state.items.filter((x) => String(x.id) !== id)
        : [...state.items, { ...r, id }];
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
