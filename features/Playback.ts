import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface currentState {
  playback: boolean;
}

const initialState: currentState = {
  playback: false,
};

const PlaybackSlice = createSlice({
  name: "playback",
  initialState,
  reducers: {
    setPlayback: (state, action: PayloadAction<boolean>) => {
      state.playback = action.payload;
    },
  },
});

export const { setPlayback } = PlaybackSlice.actions;
export default PlaybackSlice.reducer;
