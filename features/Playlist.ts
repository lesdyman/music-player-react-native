import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Track } from "../types/Track";

interface PlaylistState {
  playlist: Track[];
}

const initialState: PlaylistState = {
  playlist: [],
};

const PlaylistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setPlaylist: (state, action: PayloadAction<Track[]>) => {
      state.playlist = action.payload;
    },
  },
});

export const { setPlaylist } = PlaylistSlice.actions;
export default PlaylistSlice.reducer;
