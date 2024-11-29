import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "../components/ProgressBar";
import { ControlPanel } from "../components/ControlPanel";
import { useEffect, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  GestureHandlerRootView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../data/store";
import { fetchSongs } from "../features/AllSongs";
import { PlayList } from "./PlayList";

export const Main = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { currentSong } = useSelector((state: RootState) => state.currentSong);

  const handlePlaylistOpen = () => bottomSheetRef.current?.expand();

  useEffect(() => {
    dispatch(fetchSongs());
  }, []);

  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log("handleSheetChanges", index);
  // }, []);

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

        <TouchableWithoutFeedback
          style={{
            gap: 5,
          }}
          onPress={handlePlaylistOpen}
        >
          <Image
            source={require("../assets/pull-icon.png")}
            style={{
              height: 5,
              width: "100%",
              objectFit: "contain",
            }}
          />

          <Text
            style={{
              color: "#666666",
              fontSize: 12,
              fontFamily: "RussoOne_400Regular",
              textTransform: "uppercase",
            }}
          >
            Press to open the song list
          </Text>
        </TouchableWithoutFeedback>

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
