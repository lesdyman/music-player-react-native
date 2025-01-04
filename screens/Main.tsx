import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, View } from "react-native";
import { ProgressBar } from "../components/ProgressBar";
import { ControlPanel } from "../components/ControlPanel";
import { useEffect, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../data/store";
import { fetchSongs } from "../features/AllSongs";
import { PlayList } from "./PlayList";
import { OpenPlaylistButton } from "../components/OpenPlaylistButtom";
import { fetchFavoritesFromStorage } from "../utils/utils";
import { setFavorites } from "../features/Favorites";
import { setPlaylist } from "../features/Playlist";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { changeVolume } from "../features/Playback";

export const Main = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { currentSong, volume } = useSelector(
    (state: RootState) => state.playback
  );
  const { songs } = useSelector((state: RootState) => state.songs);

  const handlePlaylistOpen = () => bottomSheetRef.current?.expand();

  const progress = useSharedValue(volume);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  const loadFavs = async () => {
    const favs = await fetchFavoritesFromStorage();
    if (favs) {
      dispatch(setFavorites(favs));
    }
  };

  useEffect(() => {
    dispatch(fetchSongs());
    loadFavs();
  }, []);

  useEffect(() => {
    if (songs.length > 0) {
      dispatch(setPlaylist("all"));
    }
  }, [songs, dispatch]);

  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log("handleSheetChanges", index);
  // }, []);

  const handleVolumeChange = (value: number) => {
    dispatch(changeVolume(value));
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#2C3137", "#17191D"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={styles.coverImageShadowUp}>
          <View style={styles.coverImageShadowDown}>
            <LinearGradient
              colors={["#41464B", "#1A1B1F"]}
              start={{ x: 0.2, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.imageBorder}
            >
              {!currentSong ? (
                <Image
                  source={require("../assets/speaker_default.jpg")}
                  style={styles.coverImage}
                />
              ) : (
                <Image
                  source={{ uri: currentSong?.album_image }}
                  style={styles.coverImage}
                />
              )}
            </LinearGradient>
          </View>
        </View>

        <ProgressBar />
        <ControlPanel />

        <View
          style={{
            flexDirection: "row",
            height: 30,
            width: "80%",
            // borderWidth: 1,
            // borderColor: "red",
            gap: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="volume-low" size={20} color={"#797C7F"} />
          <Slider
            minimumValue={min}
            progress={progress}
            maximumValue={max}
            containerStyle={{
              backgroundColor: "#111216",
              borderWidth: 1,
              borderColor: "#383B46",
              borderRadius: 5,
              width: "100%",
            }}
            theme={{
              minimumTrackTintColor: "#D6361F",
              heartbeatColor: "red",
            }}
            renderBubble={() => null}
            onValueChange={(value) => {
              handleVolumeChange(value);
              progress.value = value;
            }}
          />
          <Ionicons name="volume-high" size={20} color={"#797C7F"} />
        </View>

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
  text: {
    color: "red",
  },
  coverImage: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    borderWidth: 5,
    borderColor: "#0F1314",
    resizeMode: "cover",
  },
  imageBorder: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },
  coverImageShadowUp: {
    width: 255,
    height: 255,
    marginTop: 148,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    shadowColor: "#41464B",
    shadowOffset: { width: -7, height: -10 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  coverImageShadowDown: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    shadowColor: "#0F1314",
    shadowOffset: { width: 3, height: 16 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
});
