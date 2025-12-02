import React, { useState } from "react";
import { 
  View, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Keyboard 
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesByKeyword, getRecipesByIngredients } from "../src/store/recipeSlice"; 
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; 
import store from "../src/store/store";

type AppDispatch = typeof store.dispatch;

// --- CONFIGURATION ---
const CATEGORIES = [
  { name: "Breakfast", icon: "🍳" },
  { name: "Main Course", icon: "🍗" },
  { name: "Dessert", icon: "🍰" },
  { name: "Vegetarian", icon: "🥗" },
  { name: "Italian", icon: "🍝" },
  { name: "Mexican", icon: "🌮" },
  { name: "Healthy", icon: "🥑" },
];

// --- COMPONENTS ---
const RecipeCard = ({ recipe, onPress }: any) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.cardContainer}>
      <Image source={{ uri: recipe.image }} style={styles.cardImage} resizeMode="cover"/>
      <View style={styles.cardOverlay}>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle} numberOfLines={1}>{recipe.title}</Text>
          <Text style={styles.cardSubtitle}>Tap to view details →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CategoryPill = ({ name, icon, isActive, onPress }: any) => (
  <TouchableOpacity 
    style={[styles.categoryPill, isActive && styles.categoryPillActive]} 
    onPress={onPress}
  >
    <Text style={styles.categoryIcon}>{icon}</Text>
    <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
      {name}
    </Text>
  </TouchableOpacity>
);

export default function SearchScreen() {
  const router = useRouter(); 
  const [keyword, setKeyword] = useState("");
  const [ingredientText, setIngredientText] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [lastSearch, setLastSearch] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  
  const recipes = useSelector((state: any) => state.recipes.list);
  const loading = useSelector((state: any) => state.recipes.loading);

  const handleSearch = () => {
    Keyboard.dismiss();
    if (keyword.trim() !== "") {
      setActiveCategory(null); 
      setLastSearch(keyword);
      dispatch((getRecipesByKeyword as any)(keyword));
    }
  };

  const handleClearSearch = () => {
    setKeyword("");
    setLastSearch("");
    setActiveCategory(null);
    Keyboard.dismiss();
  };

  const handleIngredientSearch = () => {
    Keyboard.dismiss();
    if (ingredientText.trim() !== "") {
      setActiveCategory(null);
      setLastSearch(`Ingredients: ${ingredientText}`);
      const list = ingredientText.split(",").map((s) => s.trim());
      dispatch((getRecipesByIngredients as any)(list));
    }
  };

  const handleCategoryPress = (category: string) => {
    setKeyword(""); 
    setLastSearch(category);
    setActiveCategory(category);
    dispatch((getRecipesByKeyword as any)(category));
  };

  // --- HEADER ---
  const renderHeader = (
    <View style={styles.headerContainer}>
      {/* BRAND */}
      <View style={styles.brandContainer}>
        <Text style={styles.brandTitle}>
          Recipe<Text style={styles.brandHighlight}>Maker</Text>
        </Text>
        <Text style={styles.brandSubtitle}>Create. Cook. Enjoy.</Text>
      </View>

      {/* RESULT TEXT */}
      {lastSearch && recipes.length > 0 && (
        <Text style={styles.resultText}>
          Found {recipes.length} results for <Text style={{fontWeight:'bold'}}>"{lastSearch}"</Text>
        </Text>
      )}

      {/* SEARCH BAR */}
      <View style={styles.searchWrapper}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Search recipes..."
          value={keyword}
          onChangeText={setKeyword}
          style={styles.searchInput}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {keyword.length > 0 && (
          <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
            <Ionicons name="close-circle" size={18} color="#ccc" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleSearch} style={styles.goButton}>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* CATEGORIES */}
      <Text style={styles.sectionHeader}>Browse Categories</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoryScroll}
        keyboardShouldPersistTaps="handled"
      >
        {CATEGORIES.map((cat) => (
          <CategoryPill
            key={cat.name}
            name={cat.name}
            icon={cat.icon}
            isActive={activeCategory === cat.name}
            onPress={() => handleCategoryPress(cat.name)}
          />
        ))}
      </ScrollView>

      {/* INGREDIENTS */}
      <View style={styles.ingredientWrapper}>
        <Text style={styles.sectionHeader}>Search by Ingredients</Text>
        <TextInput
          placeholder="e.g. egg, cheese, tomato"
          value={ingredientText}
          onChangeText={setIngredientText}
          style={styles.ingredientInput}
          onSubmitEditing={handleIngredientSearch}
        />
      </View>

      <Text style={[styles.sectionHeader, { marginTop: 20 }]}>
        {recipes.length > 0 ? "Results" : "Trending Now"}
      </Text>
    </View>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.webContainer}>
        <FlatList
          data={recipes}
          keyExtractor={(item: any) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            !loading && (
              <View style={styles.emptyState}>
                <Ionicons name="restaurant-outline" size={60} color="#ddd" />
                <Text style={styles.emptyText}>Start Cooking!</Text>
                <Text style={styles.emptySubText}>Search for a recipe above.</Text>
              </View>
            )
          }
          renderItem={({ item }: any) => (
            <RecipeCard
              recipe={item}
              onPress={() => router.push(`/recipe/${item.id}`)}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    width: "100%", 
  },
  webContainer: {
    width: "100%",
    maxWidth: 500,
    alignSelf: "center", 
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 50,
  },
  headerContainer: {
    marginBottom: 10,
    width: "100%",
  },
  brandContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 25,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#2D3748",
    letterSpacing: -1,
    textAlign: "center",
  },
  brandHighlight: { color: "#FF6B6B" },
  brandSubtitle: {
    fontSize: 14,
    color: "#A0AEC0",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginTop: -5,
    fontWeight: "600",
    textAlign: "center",
  },
  resultText: {
    textAlign: "center",
    color: "#718096",
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3748",
    marginTop: 10,
    marginBottom: 10,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    paddingLeft: 15,
    paddingRight: 8,
    height: 55,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
    width: "100%",
  },
  searchIcon: { marginRight: 10 },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: "100%",
  },
  clearButton: { padding: 5, marginRight: 5 },
  goButton: {
    backgroundColor: "#FF6B6B",
    padding: 10,
    borderRadius: 12,
  },
  ingredientWrapper: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
  },
  ingredientInput: {
    fontSize: 14,
    color: "#666",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    width: "100%",
  },
  categoryScroll: {
    marginBottom: 10,
    marginHorizontal: -5, 
  },
  categoryPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  categoryPillActive: {
    backgroundColor: "#FF6B6B",
    borderColor: "#FF6B6B",
  },
  categoryIcon: { marginRight: 8, fontSize: 16 },
  categoryText: { fontWeight: "600", color: "#4A5568" },
  categoryTextActive: { color: "white" },
  cardContainer: {
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: "white",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    width: "100%",
  },
  cardImage: { width: "100%", height: "100%" },
  cardOverlay: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    backgroundColor: "rgba(0,0,0,0.4)", padding: 15,
  },
  cardTitle: {
    color: "white", fontSize: 18, fontWeight: "bold", marginBottom: 4,
    textShadowColor: "rgba(0,0,0,0.5)", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3,
  },
  cardSubtitle: { color: "#FFD700", fontWeight: "600", fontSize: 12 },
  emptyState: { alignItems: "center", marginTop: 40, opacity: 0.5 },
  emptyText: { fontSize: 18, fontWeight: "bold", color: "#888", marginTop: 10 },
  emptySubText: { fontSize: 14, color: "#aaa" },
  cardTextContainer: { width: '100%' }
});