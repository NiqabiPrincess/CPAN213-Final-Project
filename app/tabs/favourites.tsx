import React from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Filler favorites, waiting on Redux
const DUMMY_FAVORITES = [
    { id: "1", title: "Pasta Bolognese"},
    { id: "2", title: "Avocado Toast"},
];

export default function Favourites() {
    const handlePress = (item:any) => {
        Alert.alert(
            "Remove favorited recipes?",
            'Do you want to remove "${item.title}" from favorites?',
            [
                { text: "Cancel", style: "cancel"},
                {
                    text:"Remove",
                    onPress: () => {
                        //Filler until replaced with real Redux call
                        console.log("Remove favorite in Redux here");
                    },
                },
            ]
        );
    };

    const renderFavourite = ({ item }: any) => (
        <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
            <Text style={styles.cardTitle}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <Text style={styles.screenTitle}>Favourites</Text>

            {DUMMY_FAVORITES.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No favourite recipes yet.</Text>
                </View>
            ) : (
                <FlatList
                    data={DUMMY_FAVORITES}
                    renderItem={renderFavourite}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "center",
    },
    listContent: {
        paddingBottom: 16,
    },
    card: {
        backgroundColor: "white",
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "600",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        color: "#777",
    },
});
