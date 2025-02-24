import BottomSheet from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ControlPanel } from "../components/ControlPanel";
import { OpenPlaylistButton } from "../components/OpenPlaylistButtom";
import { ProgressBar } from "../components/ProgressBar";
import { VolumeControl } from "../components/VolumeControl";

import { PlayList } from "./PlayList";

import { AppDispatch, RootState } from "../data/store";
import { fetchSongs } from "../features/AllSongs";
import { playbackControl } from "../features/Playback";
import { setFavorites } from "../features/Favorites";
import { setPlaylist } from "../features/Playlist";

import { fetchFavoritesFromStorage } from "../utils/utils";

export const Main = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { width } = Dimensions.get("screen");

  const currentSong = useSelector(
    (state: RootState) => state.playback.currentSong
  );
  const songs = useSelector((state: RootState) => state.songs.songs);
  const playback = useSelector((state: RootState) => state.playback.playback);
  const loadingTrack = useSelector((state: RootState) => state.playback.loadingTrack);
  const dispatch = useDispatch<AppDispatch>();

  const [isLoaded, setIsLoaded] = useState(false);

  const handlePlaylistOpen = () => bottomSheetRef.current?.expand();

  const loadFavs = async () => {
    const favs = await fetchFavoritesFromStorage();
    if (favs) {
      dispatch(setFavorites(favs));
    }
  };

  const initialize = async () => {
    setIsLoaded(false);
    await dispatch(fetchSongs());
    await loadFavs();
    setIsLoaded(true);
  };

  useEffect(() => {
    initialize();
  }, [dispatch]);

  useEffect(() => {
    if (isLoaded && songs.length > 0) {
      dispatch(setPlaylist("all"));
      dispatch(playbackControl(songs[0]));
    }
  }, [isLoaded, songs]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#2C3137", "#17191D"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View
          style={[
            styles.coverImageShadowUp,
            { width: width * 0.9, height: width * 0.9 },
          ]}
        >
          <View style={styles.coverImageShadowDown}>
            {loadingTrack && !playback && (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" />
              </View>
            )}

            <LinearGradient
              colors={["#41464B", "#1A1B1F"]}
              start={{ x: 0.2, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.imageBorder}
            >
              <Image
                source={
                  currentSong
                    ? { uri: currentSong?.album_image }
                    : require("../assets/speaker_default.jpg")
                }
                style={styles.coverImage}
              />
            </LinearGradient>
          </View>
        </View>

        <ProgressBar />
        <ControlPanel />
        <VolumeControl />

        <OpenPlaylistButton handlePlaylistOpen={handlePlaylistOpen} />

        <PlayList ref={bottomSheetRef} />
      </LinearGradient>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  coverImage: {
    width: "100%",
    height: "100%",
    borderRadius: Dimensions.get("screen").width * 0.45,
    borderWidth: 5,
    borderColor: "#0F1314",
    resizeMode: "cover",
  },
  imageBorder: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Dimensions.get("screen").width * 0.45,
  },
  coverImageShadowUp: {
    marginTop: 130,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Dimensions.get("screen").width * 0.45,
    shadowColor: "#41464B",
    shadowOffset: { width: -7, height: -10 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  coverImageShadowDown: {
    width: "100%",
    height: "100%",
    borderRadius: Dimensions.get("screen").width * 0.45,
    shadowColor: "#0F1314",
    shadowOffset: { width: 3, height: 16 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: Dimensions.get("screen").width * 0.45,
    zIndex: 10,
  },
});

export default Main;
