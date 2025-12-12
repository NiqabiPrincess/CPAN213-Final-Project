import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./recipeSlice";
import favoritesReducer from "./favoritesSlice";
import pantryReducer from "./pantrySlice";


const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    favorites: favoritesReducer,
    pantry: pantryReducer,
  },
});
export default store;
