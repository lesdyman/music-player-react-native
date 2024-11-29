import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Track } from "../types/Track";

interface CurrentSongState {
  currentSong: Track | null;
}

const initialState: CurrentSongState = {
  currentSong: null,
};

const CurrentSongSlice = createSlice({
  name: "currentSong",
  initialState,
  reducers: {
    setCurrentSong: (state, action: PayloadAction<Track>) => {
      if (state.currentSong?.id === action.payload.id) {
        state.currentSong = null;
      } else {
        state.currentSong = action.payload;
      }
    },
  },
});

export const { setCurrentSong } = CurrentSongSlice.actions;
export default CurrentSongSlice.reducer;
