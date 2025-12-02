import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../src/store/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#F9FAFB" },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="recipe/[id]" options={{ presentation: "card" }} />
      </Stack>
    </Provider>
  );
}