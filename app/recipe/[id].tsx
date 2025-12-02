import React, { useEffect } from "react";
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  StyleSheet, 
  ActivityIndicator 
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useLocalSearchParams } from "expo-router"; 
import store from "../../src/store/store"; 
import { getRecipeDetails } from "../../src/store/recipeSlice"; 

type AppDispatch = typeof store.dispatch;

export default function RecipeDetailsScreen() {
  const { id } = useLocalSearchParams();
  
  const dispatch = useDispatch<AppDispatch>();
  
  const recipe = useSelector((s: any) => s.recipes.details);
  const loading = useSelector((s: any) => s.recipes.loading);

  useEffect(() => {
    if (id) {
      const recipeId = Array.isArray(id) ? id[0] : id;
      
      dispatch((getRecipeDetails as any)(recipeId));
    }
  }, [id]);

  if (loading || !recipe) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  const cleanSummary = recipe.summary ? recipe.summary.replace(/<[^>]+>/g, '') : "";

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: recipe.image }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{recipe.title}</Text>
            
            <View style={styles.statsRow}>
              {recipe.readyInMinutes && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>⏱ {recipe.readyInMinutes} min</Text>
                </View>
              )}
              {recipe.servings && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>🍽 {recipe.servings} Servings</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.ingredientsList}>
            {recipe.extendedIngredients?.map((ing: any, index: number) => (
              <View key={index} style={styles.ingredientRow}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.ingredientText}>{ing.original}</Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.instructionsText}>
            {recipe.instructions || cleanSummary || "No instructions provided."}
          </Text>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    width: "100%",
    maxWidth: 600, 
    alignSelf: "center",
    backgroundColor: "#fff",
    paddingBottom: 40,
  },
  imageContainer: {
    width: "100%",
    height: 300,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "white",
    padding: 20, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    marginBottom: 20,
    width: "100%",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#333",
    marginBottom: 12,
    lineHeight: 32,
    flexWrap: "wrap",
    width: "100%", 
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  badge: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 5,
  },
  badgeText: {
    fontWeight: "600",
    color: "#555",
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 20,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
    marginBottom: 12,
  },
  ingredientsList: {
    marginBottom: 10,
    width: "100%",
  },
  ingredientRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    width: "100%",
    paddingRight: 10, 
  },
  bulletPoint: {
    fontSize: 18,
    color: "orange",
    marginRight: 10,
    lineHeight: 24,
  },
  ingredientText: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
    flex: 1,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  instructionsText: {
    fontSize: 16,
    lineHeight: 28,
    color: "#444",
    textAlign: "left",
    width: "100%",
  },
});
