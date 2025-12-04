import { Stack } from "expo-router";

export default function RecipeLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                animation: "slide_from_right",
            }}
        >
            <Stack.Screen name="[id]" options={{ title: "Recipe Details" }} />
        </Stack>
    );
}
