import React from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../../src/store/favoritesSlice";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Favourites() {
    const dispatch = useDispatch();
    const router = useRouter();
    const favorites = useSelector((state: any) => state.favorites.items);

    const handlePress = (item: any) => {
        router.push(`/recipe/${item.id}`);
    };

    const handleDelete = (id: string) => {
        Alert.alert("Remove?", "Remove from favorites?", [
            { text: "Cancel", style: "cancel" },
            { text: "Remove", onPress: () => dispatch(removeFavorite(id)) }
        ]);
    };

    const renderFavourite = ({ item }: any) => (
        <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
            {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
            <View style={styles.info}>
                <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.trash}>
                <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <Text style={styles.screenTitle}>My Favourites</Text>
            {favorites.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No favorites yet.</Text>
                </View>
            ) : (
                <FlatList
                    data={favorites}
                    renderItem={renderFavourite}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
    screenTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 12, textAlign: "center" },
    listContent: { paddingBottom: 16 },
    card: { flexDirection: 'row', backgroundColor: "white", padding: 12, borderRadius: 8, marginBottom: 10, alignItems: 'center', elevation: 2 },
    image: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
    info: { flex: 1 },
    cardTitle: { fontSize: 16, fontWeight: "600" },
    trash: { padding: 8 },
    emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    emptyText: { fontSize: 18, color: "#888" },
});