import { configureStore } from "@reduxjs/toolkit";
import AllSongsReducer from "../features/AllSongs";
import CurrentSongReducer from "../features/CurrentSong";
import PlaybackReducer from "../features/Playback";

const store = configureStore({
  reducer: {
    songs: AllSongsReducer,
    currentSong: CurrentSongReducer,
    playback: PlaybackReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
