import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const INITIAL_ITEMS = [
  { id: "1", name: "Tomatoes", checked: false },
  { id: "2", name: "Onions", checked: true },
  { id: "3", name: "Spaghetti", checked: false },
];

export default function ShoppingList() {
    const [items, setItems] = useState(INITIAL_ITEMS);

    const toggleItem = (id: string) => {
        setItems((current) =>
            current.map((item) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            style={[styles.itemRow, item.checked && styles.itemRowChecked]}
            onPress={() => toggleItem(item.id)}
        >
            <Text style={[styles.itemText, item.checked && styles.itemTextChecked]}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );
    
    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <Text style={styles.screenTitle}>Shopping List</Text>

            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
            />
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
    itemRow: {
        backgroundColor: "white",
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
    itemRowChecked: {
        backgroundColor: "#d1ffd1",
    },
    itemText: {
        fontSize: 16,
    },
    itemTextChecked: {
        textDecorationLine: "line-through",
        color: "#666",
    },
});
