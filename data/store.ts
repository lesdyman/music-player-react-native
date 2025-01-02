import { configureStore } from "@reduxjs/toolkit";
import AllSongsReducer from "../features/AllSongs";
import PlaybackReducer from "../features/Playback";
import FavoritesReducer from '../features/Favorites';
import PlaylistReducer from '../features/Playlist';

const store = configureStore({
  reducer: {
    songs: AllSongsReducer,
    playback: PlaybackReducer,
    favorites: FavoritesReducer,
    playlist: PlaylistReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
