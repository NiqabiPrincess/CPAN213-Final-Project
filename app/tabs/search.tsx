import React from "react";
import { useRouter } from "expo-router";

import SearchScreen from "../../src/screens/SearchScreen";

export default function Search() {
  const router = useRouter();

  const navigation = {
    navigate: (name: string, params?: any) => {
      if (name === "RecipeDetails" && params?.id) {
        router.push(`/recipe/${params.id}`);
        return;
      }
    },
  };

  return <SearchScreen navigation={navigation as any} />;
}
