import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Track } from "../types/Track";

  const baseURL = 'https://api.jamendo.com/v3.0/tracks/?client_id=4a921162&format=json&tags=';
  const trackLimiter = '&limit=50';

interface AllSongsState {
  songs: Track[];
  genre: string;
}

const initialState: AllSongsState = {
  songs: [],
  genre: '',
};

const songsSlice = createSlice({
  name: "songs",
  initialState,

  reducers: {
    setSongs: (state, action: PayloadAction<Track[]>) => {
      state.songs = action.payload;
    },
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        console.log(`pending in process`);
      })
      .addCase(
        fetchSongs.fulfilled,
        (state, action: PayloadAction<Track[]>) => {
          if (state.songs.length > 0) {
            state.songs = [];
          }
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
  { state: { songs: AllSongsState }; rejectValue: string }
>("songs/fetchSongs", async (_, {getState, rejectWithValue }) => {
  const state = getState();
  const genre = state.songs.genre;
  try {
    const URL = baseURL + genre + trackLimiter;
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

export const { setSongs, setGenre } = songsSlice.actions;
export default songsSlice.reducer;
