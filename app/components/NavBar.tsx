import Ionicons from "@expo/vector-icons/Ionicons";
import { usePathname, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NavBar() {
    const router = useRouter();
    const pathname = usePathname();

    const tabs = [
        { name: "Home", icon: "home-outline", route: "/tabs" },
        { name: "Search", icon: "search-outline", route: "/tabs/search" },
        {
            name: "Favourites",
            icon: "heart-outline",
            route: "/tabs/favourites",
        },
        { name: "Recipes", icon: "book-outline", route: "/tabs/recipes" },
    ] as const;

    return (
        <View style={styles.container}>
            {tabs.map((tab) => {
                const focused = pathname === tab.route;

                return (
                    <TouchableOpacity
                        key={tab.route}
                        onPress={() => router.push(tab.route)}
                        style={styles.item}
                    >
                        <Ionicons
                            name={tab.icon as any}
                            size={24}
                            color={focused ? "#007AFF" : "#555"}
                        />
                        <Text
                            style={[
                                styles.label,
                                focused && { color: "#007AFF" },
                            ]}
                        >
                            {tab.name}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 60,
        borderTopWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#fff",
        justifyContent: "space-around",
        alignItems: "center",
    },
    item: {
        alignItems: "center",
    },
    label: {
        fontSize: 12,
        marginTop: 4,
    },
});
