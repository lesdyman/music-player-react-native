import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Track } from "../types/Track";
import { saveFavoritesToStorage } from "../utils/utils";

interface InitialFavorites {
  favorites: Track[];
}

const initialState: InitialFavorites = {
  favorites: [],
};

const Favorites = createSlice({
  name: "Favorites",
  initialState,
  reducers: {
    addRemoveFavorite: (state, action: PayloadAction<Track | null>) => {
      if (action.payload) {
        const trackInder = state.favorites.findIndex(
          (track) => track.id === action.payload?.id
        );

        if (trackInder !== -1) {
          state.favorites.splice(trackInder, 1);
        } else {
          state.favorites.push(action.payload);
        }
      }
      saveFavoritesToStorage(state.favorites);
    },

    setFavorites: (state, action: PayloadAction<Track[]>) => {
      state.favorites = action.payload;
    }
  },
});

export const { addRemoveFavorite, setFavorites } = Favorites.actions;
export default Favorites.reducer;
