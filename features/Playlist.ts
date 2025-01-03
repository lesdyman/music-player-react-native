import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Track } from "../types/Track";

type List = 'all' | 'favorites';

interface PlaylistState {
  playlist: List;
}

const initialState: PlaylistState = {
  playlist: 'all',
};

const PlaylistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setPlaylist: (state, action: PayloadAction<List>) => {
      state.playlist = action.payload;
    },
  },
});

export const { setPlaylist } = PlaylistSlice.actions;
export default PlaylistSlice.reducer;
