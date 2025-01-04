import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Audio } from "expo-av";
import { Track } from "../types/Track";
import { RootState, AppDispatch } from "../data/store";

let soundInstance: Audio.Sound | null = null;

interface PlaybackState {
  playback: boolean;
  sound: string | null;
  currentSong: Track | null;
  volume: number;
}

const initialState: PlaybackState = {
  playback: false,
  sound: null,
  currentSong: null,
  volume: 0.3,
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
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    }
  },
});

export const playbackControl = createAsyncThunk<
  void,
  Track,
  { state: RootState; dispatch: AppDispatch }
>("playback/controlPlayback", async (song, { getState, dispatch }) => {
  const { playback, currentSong, volume } = getState().playback;

  await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

  if (soundInstance === null || song.id !== currentSong?.id) {
    if (soundInstance !== null) {
      await soundInstance.stopAsync();
      soundInstance = null;
      dispatch(setPlayback(false));
    }

    const playbackObj = new Audio.Sound();
    await playbackObj.loadAsync({ uri: song.audio }, { shouldPlay: true, volume });
    soundInstance = playbackObj;
    dispatch(setSound(song.audio));
    dispatch(setCurrentSong(song));
    dispatch(setPlayback(true));
    dispatch(setVolume(volume))
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

export const changeVolume = createAsyncThunk<
  void,
  number,
  { state: RootState; dispatch: AppDispatch }
>("playback/changeVolume", async (volume, { dispatch }) => {
  if (soundInstance) {
    try {
      await soundInstance.setVolumeAsync(volume);
      dispatch(setVolume(volume));
    } catch (error) {
      console.log(
        `Oops! Something went wront while changing volume. Error: ${error}`
      );
    }
  } else {
    return;
  }
});

export const { setPlayback, setSound, setCurrentSong, setVolume } = PlaybackSlice.actions;
export default PlaybackSlice.reducer;
