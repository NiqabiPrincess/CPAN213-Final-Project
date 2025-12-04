import axios from "axios";

const API_URL = "https://api.spoonacular.com/recipes";
const API_KEY = "a311c7c3a36b481aacbd122bb17564f0"; 

export const fetchRecipesByKeyword = async (keyword) => {
  try {
    const res = await axios.get(`${API_URL}/complexSearch`, {
      params: { query: keyword, number: 20, apiKey: API_KEY }
    });
    console.log("API SUCCESS:", res.data.results);
    return res.data.results;
  } catch (error) {
    console.error("API ERROR:", error);
    throw error;
  }
};

export const fetchRecipesByIngredients = async (ingredients) => {
  const res = await axios.get(`${API_URL}/findByIngredients`, {
    params: {
      ingredients: ingredients.join(","),
      number: 20,
      apiKey: API_KEY
    }
  });
  return res.data;
};

export const fetchRecipeDetails = async (id) => {
  const res = await axios.get(`${API_URL}/${id}/information`, {
    params: { apiKey: API_KEY }
  });
  return res.data;
};