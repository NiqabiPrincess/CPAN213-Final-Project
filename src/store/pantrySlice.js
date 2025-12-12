import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const pantrySlice = createSlice({
  name: "pantry",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const name = String(action.payload || "").trim();
      if (!name) return;

      const exists = state.items.some(
        (x) => x.name.toLowerCase() === name.toLowerCase()
      );
      if (exists) return;

      state.items.push({ id: makeId(), name, checked: false });
    },
    addMany: (state, action) => {
      const arr = Array.isArray(action.payload) ? action.payload : [];
      for (const raw of arr) {
        const name = String(raw || "").trim();
        if (!name) continue;
        const exists = state.items.some(
          (x) => x.name.toLowerCase() === name.toLowerCase()
        );
        if (!exists) state.items.push({ id: makeId(), name, checked: false });
      }
    },
    toggleItem: (state, action) => {
      const id = String(action.payload);
      const item = state.items.find((x) => x.id === id);
      if (item) item.checked = !item.checked;
    },
    removeItem: (state, action) => {
      const id = String(action.payload);
      state.items = state.items.filter((x) => x.id !== id);
    },
    clearPantry: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, addMany, toggleItem, removeItem, clearPantry } =
  pantrySlice.actions;

export default pantrySlice.reducer;
