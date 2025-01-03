import AsyncStorage from "@react-native-async-storage/async-storage";
import { Track } from "../types/Track";

const FAVORITES_STORAGE_KEY = "favorites";

export const saveFavoritesToStorage = async (favorites: Track[]) => {
  try {
    await AsyncStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favorites)
    );
  } catch (error) {
    console.log(
      `Oops! Trouble occured while saving favs to storage! Error: ${error}`
    );
  }
};

export const fetchFavoritesFromStorage = async () => {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);

    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log(
      `Oops! Something went wront while loading favs from storage. Error: ${error}`
    );
  }
};