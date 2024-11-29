import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Track } from "../types/Track";

const URL =
  "https://api.jamendo.com/v3.0/tracks/?client_id=4a921162&format=json&tags=rock&limit=30";

interface AllSongsState {
  songs: Track[];
}

const initialState: AllSongsState = {
  songs: [],
};

const songsSlice = createSlice({
  name: "songs",
  initialState,

  reducers: {
    setSongs: (state, action: PayloadAction<Track[]>) => {
      state.songs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        console.log(`pending in process, current song state: ${state.songs}`);
      })
      .addCase(
        fetchSongs.fulfilled,
        (state, action: PayloadAction<Track[]>) => {
          state.songs = action.payload;
        }
      )
      .addCase(fetchSongs.rejected, (state) => {
        console.log(
          `songs fetch rejected, current songs state: ${state.songs}`
        );
      });
  },
});

export const fetchSongs = createAsyncThunk<
  Track[],
  void,
  { rejectValue: string }
>("songs/fetchSongs", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(
        `Error occurred while fetching music, status: ${response.status}`
      );
    }
    const data = await response.json();
    return data.results;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch songs");
  }
});

export const { setSongs } = songsSlice.actions;
export default songsSlice.reducer;
