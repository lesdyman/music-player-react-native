import { configureStore } from "@reduxjs/toolkit";
import AllSongsReducer from '../features/AllSongs';
import CurrentSongReducer from '../features/CurrentSong';

const store = configureStore({
  reducer: {
    songs: AllSongsReducer,
    currentSong: CurrentSongReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;