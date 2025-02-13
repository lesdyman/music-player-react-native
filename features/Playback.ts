import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Audio } from "expo-av";
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


export const playbackControl = createAsyncThunk<
  void,
  Track,
  { state: RootState; dispatch: AppDispatch }
>("playback/controlPlayback", async (song, { getState, dispatch }) => {
  const { playback, currentSong, volume } = getState().playback;

  dispatch(setLoadingTrack(true));

  await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });


  if (!soundInstance || song.id !== currentSong?.id) {
    if (soundInstance) {
      await soundInstance.stopAsync();
      await soundInstance.unloadAsync();
      soundInstance = null;
      dispatch(setPlayback(false));
    }

    const playbackObj = new Audio.Sound();
    try {
      await playbackObj.loadAsync(
        { uri: song.audio },
        { shouldPlay: true, volume }
      );
      soundInstance = playbackObj;
      dispatch(setCurrentSong(song));
      dispatch(setPlayback(true));
    } catch (error) {
      console.log("Error loading the song: ", error);
    }
  } else {
    if (playback && soundInstance) {
      await soundInstance.setStatusAsync({ shouldPlay: false });
      dispatch(setPlayback(false));
    } else if (!playback && soundInstance) {
      await soundInstance.playAsync();
      dispatch(setPlayback(true));
    }
  }
  dispatch(setLoadingTrack(false));
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

export const { setPlayback, setSound, setCurrentSong, setLoadingTrack, setVolume } =
  PlaybackSlice.actions;
export default PlaybackSlice.reducer;
