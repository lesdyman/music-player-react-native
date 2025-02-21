import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Audio, InterruptionModeAndroid } from "expo-av";
import { Track } from "../types/Track";
import { RootState, AppDispatch } from "../data/store";

let soundInstance: Audio.Sound | null = null;

interface PlaybackState {
  playback: boolean;
  loadingTrack: boolean;
  sound: string | null;
  currentSong: Track | null;
  volume: number;
}

const initialState: PlaybackState = {
  playback: false,
  loadingTrack: false,
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
    setLoadingTrack: (state, action: PayloadAction<boolean>) => {
      state.loadingTrack = action.payload;
    },
    setSound: (state, action: PayloadAction<string | null>) => {
      state.sound = action.payload;
    },
    setCurrentSong: (state, action: PayloadAction<Track | null>) => {
      state.currentSong = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
  },
});

const togglePlayback = async (
  soundInstance: Audio.Sound | null,
  playback: boolean,
  dispatch: AppDispatch
) => {
  if (!soundInstance) return;

  if (playback) {
    console.log("⏸ Pausing playback...");
    await soundInstance.pauseAsync();
    dispatch(setPlayback(false));
  } else {
    console.log("▶️ Resuming playback...");
    await soundInstance.playAsync();
    dispatch(setPlayback(true));
  }
};

const stopAndUnloadSound = async (
  soundInstance: Audio.Sound | null,
  dispatch: AppDispatch
) => {
  if (!soundInstance) return;

  console.log("🛑 Stopping and unloading previous sound...");
  try {
    await soundInstance.stopAsync();
    await soundInstance.unloadAsync();
    dispatch(setPlayback(false));
    console.log("✅ Previous sound unloaded.");
  } catch (error) {
    console.error("❌ Error unloading the song:", error);
  }
};

const loadAndPlayNewSound = async (
  song: Track,
  volume: number,
  dispatch: AppDispatch
) => {
  console.log("🎵 Loading new sound...");
  const playbackObj = new Audio.Sound();

  try {
    await playbackObj.loadAsync(
      { uri: song.audio },
      { shouldPlay: true, volume }
    );

    dispatch(setCurrentSong(song));
    dispatch(setPlayback(true));
    console.log("✅ New sound started playing.");
    return playbackObj;
  } catch (error) {
    console.error("❌ Error loading the song:", error);
    return null;
  }
};

let isPlayingProcessing = false;

export const playbackControl = createAsyncThunk<
  void,
  Track,
  { state: RootState; dispatch: AppDispatch }
>("playback/controlPlayback", async (song, { getState, dispatch }) => {
  if (isPlayingProcessing) {
    console.log("⚠️ playbackControl already in process, skipping...");
    return;
  }
  isPlayingProcessing = true;

  const { playback, currentSong, volume } = getState().playback;
  dispatch(setLoadingTrack(true));

  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      playThroughEarpieceAndroid: false,
    });

    if (soundInstance && currentSong?.id === song.id) {
      togglePlayback(soundInstance, playback, dispatch);
      dispatch(setLoadingTrack(false));
      isPlayingProcessing = false;
      return;
    }

    if (soundInstance) {
      await stopAndUnloadSound(soundInstance, dispatch);
    }

    soundInstance = await loadAndPlayNewSound(song, volume, dispatch);
  } catch (error) {
    console.error("❌ Error playing the song:", error);
  } finally {
    isPlayingProcessing = false;
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

export const changePlaybackPosition = createAsyncThunk<void, number>(
  "playback/changePlaybackPosition",
  async (time: number) => {
    if (soundInstance) {
      await soundInstance.setPositionAsync(time * 1000);
    } else {
      return;
    }
  }
);

export const {
  setPlayback,
  setSound,
  setCurrentSong,
  setLoadingTrack,
  setVolume,
} = PlaybackSlice.actions;
export default PlaybackSlice.reducer;
