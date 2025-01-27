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

export const data = [
  { id: "1", title: "rock", image: require("../assets/music_covers/rock.jpg") },
  {
    id: "2",
    title: "hip-hop",
    image: require("../assets/music_covers/rap.png"),
  },
  { id: "3", title: "pop", image: require("../assets/music_covers/pop.jpg") },
  {
    id: "4",
    title: "industrial",
    image: require("../assets/music_covers/industrial.png"),
  },
  {
    id: "5",
    title: "dance",
    image: require("../assets/music_covers/dance.jpg"),
  },
  {
    id: "6",
    title: "metal",
    image: require("../assets/music_covers/metal.jpg"),
  },
];
