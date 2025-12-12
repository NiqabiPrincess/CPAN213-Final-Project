import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetails } from "../../src/store/recipeSlice";
import { toggleFavorite } from "../../src/store/favoritesSlice";
import { Ionicons } from "@expo/vector-icons";

export default function RecipeDetailsScreen() {
    const { id } = useLocalSearchParams();
    
    const dispatch: any = useDispatch();

    const recipe = useSelector((s: any) => s.recipes.details);
    const loading = useSelector((s: any) => s.recipes.loading);
    const favorites = useSelector((s: any) => s.favorites.items);
    
    const isFav = favorites.some((item: any) => String(item.id) === String(id));

    useEffect(() => {
        if (id) {
            const recipeId = Array.isArray(id) ? id[0] : id;
            dispatch((getRecipeDetails as any)(recipeId));
        }
    }, [id, dispatch]);

    const handleFavorite = () => {
        if (recipe) dispatch(toggleFavorite(recipe));
    };

    if (loading || !recipe) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="orange" />
            </View>
        );
    }

    const removeHtml = (text: string) => text ? text.replace(/<[^>]+>/g, "") : "";

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: recipe.image }} style={styles.heroImage} resizeMode="cover" />
                    
                    <TouchableOpacity style={styles.favButton} onPress={handleFavorite}>
                        <Ionicons name={isFav ? "heart" : "heart-outline"} size={28} color={isFav ? "red" : "gray"} />
                    </TouchableOpacity>
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{recipe.title}</Text>
                        <View style={styles.statsRow}>
                            {recipe.readyInMinutes && (
                                <View style={styles.badge}><Text style={styles.badgeText}>⏱ {recipe.readyInMinutes} min</Text></View>
                            )}
                            {recipe.servings && (
                                <View style={styles.badge}><Text style={styles.badgeText}>🍽 {recipe.servings} Servings</Text></View>
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
                        {removeHtml(recipe.instructions || recipe.summary || "No instructions provided.")}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: "#fff", width: "100%" },
    loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    scrollContent: { width: "100%", maxWidth: 600, alignSelf: "center", backgroundColor: "#fff", paddingBottom: 40 },
    imageContainer: { width: "100%", height: 300, position: 'relative' },
    heroImage: { width: "100%", height: "100%" },
    
    favButton: { 
        position: 'absolute', 
        bottom: -20, 
        right: 20, 
        backgroundColor: 'white', 
        padding: 10, 
        borderRadius: 30, 
        elevation: 10,
        zIndex: 10,
        shadowColor: '#000', 
        shadowOffset: {width:0, height:2}, 
        shadowOpacity:0.2, 
        shadowRadius:4 
    },
    
    contentContainer: { 
        flex: 1, 
        marginTop: -30, 
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30, 
        backgroundColor: "white", 
        padding: 20, 
        elevation: 5 
    },
    header: { marginBottom: 20, width: "100%" },
    title: { fontSize: 26, fontWeight: "800", color: "#333", marginBottom: 12, lineHeight: 32 },
    statsRow: { flexDirection: "row", flexWrap: "wrap" },
    badge: { backgroundColor: "#f0f0f0", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginRight: 10, marginBottom: 5 },
    badgeText: { fontWeight: "600", color: "#555", fontSize: 14 },
    divider: { height: 1, backgroundColor: "#eee", marginVertical: 20, width: "100%" },
    sectionTitle: { fontSize: 20, fontWeight: "700", color: "#222", marginBottom: 12 },
    ingredientsList: { marginBottom: 10, width: "100%" },
    ingredientRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 8, width: "100%", paddingRight: 10 },
    bulletPoint: { fontSize: 18, color: "orange", marginRight: 10, lineHeight: 24 },
    ingredientText: { fontSize: 16, color: "#444", lineHeight: 24, flex: 1 },
    instructionsText: { fontSize: 16, lineHeight: 28, color: "#444", textAlign: "left", width: "100%" },
});