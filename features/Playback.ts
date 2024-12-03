import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Audio } from "expo-av";
import { Track } from "../types/Track";
import { RootState, AppDispatch } from "../data/store";

let soundInstance: Audio.Sound | null = null;

interface PlaybackState {
  playback: boolean;
  sound: string | null;
  currentSong: Track | null;
}

const initialState: PlaybackState = {
  playback: false,
  sound: null,
  currentSong: null,
};

const PlaybackSlice = createSlice({
  name: "playback",
  initialState,
  reducers: {
    setPlayback: (state, action: PayloadAction<boolean>) => {
      state.playback = action.payload;
    },
    setSound: (state, action: PayloadAction<string | null>) => {
      state.sound = action.payload;
    },
    setCurrentSong: (state, action: PayloadAction<Track | null>) => {
      state.currentSong = action.payload;
    },
  },
});

export const playbackControl = createAsyncThunk<
  void,
  Track,
  { state: RootState; dispatch: AppDispatch }
>("playback/controlPlayback", async (song, { getState, dispatch }) => {
  const { playback, currentSong } = getState().playback;

  await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

  if (soundInstance === null || song.id !== currentSong?.id) {
    if (soundInstance !== null) {
      await soundInstance.stopAsync();
      soundInstance = null;
      dispatch(setPlayback(false));
    }

    const playbackObj = new Audio.Sound();
    await playbackObj.loadAsync({ uri: song.audio }, { shouldPlay: true });
    soundInstance = playbackObj;
    dispatch(setSound(song.audio));
    dispatch(setCurrentSong(song));
    dispatch(setPlayback(true));
  } else {
    if (playback && soundInstance) {
      await soundInstance.setStatusAsync({ shouldPlay: false });
      dispatch(setPlayback(false));
    } else if (!playback && soundInstance) {
      await soundInstance.playAsync();
      dispatch(setPlayback(true));
    }
  }
});

export const { setPlayback, setSound, setCurrentSong } = PlaybackSlice.actions;
export default PlaybackSlice.reducer;
