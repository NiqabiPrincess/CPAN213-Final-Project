import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//Used fill in/proxy recipe until replaced with data fetching from Redux/API
const DUMMY_RECIPES = [
    { id: "1", title: "Pasta Bolognese", readyInMinutes: 30},
    { id: "2", title: "Avocado Toast", readyInMinutes: 10},
    { id: "3", title:"Eggs Benedict", readyInMinutes: 25},
];

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState(DUMMY_RECIPES);
    const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handlePressRecipe = (recipe: any) => {
        setSelectedRecipe(recipe);
        setShowModal(true);
    };

    const renderRecipe = ({ item }: any) => (
        <TouchableOpacity style={styles.card} onPress={() => handlePressRecipe(item)}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>
                Ready in {item.readyInMinutes} minutes
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <Text style={styles.screenTitle}>Home Screen</Text>

            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" />
                    <Text style={styles.loadingText}>Loading recipes...</Text>
                </View>
            ) : (
                <FlatList
                    data={recipes}
                    renderItem={renderRecipe}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                />
            )}

            <Modal
                visible={showModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {selectedRecipe && (
                            <>
                                <Text style={styles.modalTitle}>{selectedRecipe.title}</Text>
                                <Text style={styles.modalText}>
                                    This recipe takes about {selectedRecipe.readyInMinutes} minutes.
                                </Text>
                            </>
                        )}
                        <TouchableOpacity onPress={() => setShowModal(false)}>
                            <Text style={styles.modalButton}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 8,
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
    cardSubtitle: {
        marginTop: 4,
        color: "#555",
    },
    modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 8,
    },
    modalText: {
        marginBottom: 12,
    },
    modalButton: {
        textAlign: "right",
        color: "#007AFF",
        fontWeight: "600",
    },
});
