import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { addItem, toggleItem, removeItem } from "../../src/store/pantrySlice";
import { Ionicons } from "@expo/vector-icons";

export default function ShoppingList() {
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const items = useSelector((state: any) => state.pantry.items);

    const handleAdd = () => {
        if (text.trim()) {
            dispatch(addItem(text));
            setText("");
        }
    };

    const renderItem = ({ item }: any) => (
        <View style={[styles.itemRow, item.checked && styles.itemRowChecked]}>
            <TouchableOpacity 
                style={styles.itemContent} 
                onPress={() => dispatch(toggleItem(item.id))}
            >
                <Ionicons name={item.checked ? "checkbox" : "square-outline"} size={24} color={item.checked ? "green" : "#555"} />
                <Text style={[styles.itemText, item.checked && styles.itemTextChecked]}>
                    {item.name}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(removeItem(item.id))}>
                <Ionicons name="trash-outline" size={20} color="red" />
            </TouchableOpacity>
        </View>
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
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"} 
                style={styles.inputContainer}
            >
                <TextInput 
                    style={styles.input}
                    placeholder="Add item..."
                    value={text}
                    onChangeText={setText}
                />
                <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
                    <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f5f5" },
    screenTitle: { fontSize: 24, fontWeight: "bold", marginVertical: 12, textAlign: "center" },
    listContent: { padding: 16, paddingBottom: 100 },
    itemRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: "white", padding: 12, borderRadius: 8, marginBottom: 10, justifyContent: 'space-between' },
    itemRowChecked: { backgroundColor: "#d1ffd1" },
    itemContent: { flex: 1, flexDirection: 'row', alignItems: 'center' },
    itemText: { fontSize: 16, marginLeft: 10 },
    itemTextChecked: { textDecorationLine: "line-through", color: "#666" },
    inputContainer: { flexDirection: 'row', padding: 16, backgroundColor: 'white', borderTopWidth: 1, borderColor: '#eee' },
    input: { flex: 1, backgroundColor: '#f0f0f0', borderRadius: 25, paddingHorizontal: 20, height: 40, fontSize: 16 },
    addButton: { width: 40, height: 40, backgroundColor: '#007AFF', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
});