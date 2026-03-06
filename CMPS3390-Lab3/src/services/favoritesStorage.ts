import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "@favorites";

export async function saveFavorites(favorites: string[]) {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.error("Failed to save favorites", e);
  }
}

export async function loadFavorites(): Promise<string[]> {
  try {
    const json = await AsyncStorage.getItem(FAVORITES_KEY);
    if (json) {
      return JSON.parse(json);
    }
  } catch (e) {
    console.error("Failed to load favorites", e);
  }
  return [];
}