import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons"; 

// Import Screens
import SearchScreen from "../screens/SearchScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function SearchStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchHome" component={SearchScreen} />
      <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#FF6B6B", 
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { paddingBottom: 5, height: 60 },
        // --- FIXED ICON LOGIC ---
        tabBarIcon: ({ focused, color, size }) => {
          // Force the icon to be a search glass
          const iconName = focused ? "search" : "search-outline";
          return <Ionicons name={iconName} size={28} color={color} />;
        },
        // Optional: Hide the text label if you only want the icon
        // tabBarShowLabel: false, 
      })}
    >
      <Tab.Screen 
        name="Search" 
        component={SearchStack} 
        options={{ title: "Recipes" }} // Changes the text label to "Recipes"
      />
    </Tab.Navigator>
  );
}