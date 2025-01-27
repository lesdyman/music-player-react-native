import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useMemo, forwardRef } from "react";
import { CustomHandle } from "../components/CustomHandle";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { BasicButton } from "../components/BasicButton";
import { ScrollView, StyleSheet, View } from "react-native";
import { CustomCell } from "../components/CustomCell";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../data/store";
import { playbackControl } from "../features/Playback";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Track } from "../types/Track";
import { useHeaderHeight } from "@react-navigation/elements";


export const PlayList = forwardRef<BottomSheetMethods, {}>((_, ref) => {
  const snapPoints = useMemo(() => ["25%", "50%", "85%"], []);
  const dispatch = useDispatch<AppDispatch>();

  const songs = useSelector((state: RootState) => state.songs.songs);
  const currentSong = useSelector((state: RootState) => state.playback.currentSong);
  const playlist = useSelector((state: RootState) => state.playlist.playlist);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);

  const handlePlaylistClose = () => {
    if (ref && (ref as React.MutableRefObject<BottomSheetMethods>).current) {
      (ref as React.MutableRefObject<BottomSheetMethods>).current.close();
    }
  };

  const topHlop = useHeaderHeight();

  const handleAudioPressed = async (song: Track) => {
    try {
      await dispatch(playbackControl(song));
    } catch {
      console.error("Playback failed:");
    }
  };


  return (
    <BottomSheet
      index={-1}
      ref={ref}
      snapPoints={snapPoints}
      handleComponent={CustomHandle}
      enablePanDownToClose
      backgroundStyle={styles.sheetBackgroundStyle}
      style={{
        marginTop: topHlop + 10
      }}
    >
      <BottomSheetView style={[styles.viewContainer]}>
        {/* CLOSE BUTTON */}
        <View style={styles.closeButtonContainer}>
          <TouchableWithoutFeedback onPress={handlePlaylistClose}>
            <BasicButton
              icon_name={"chevron-down"}
              height={35}
              width={35}
              color={"#999999"}
              bColor={"#2E3339"}
              size={25}
            />
          </TouchableWithoutFeedback>
        </View>

        {/* PLAYLIST */}
        <ScrollView horizontal={false} indicatorStyle="white">
          {playlist === "all"
            ? songs.map((song) => (
                <CustomCell
                  activeSong={currentSong}
                  song={song}
                  onAudioPressed={() => handleAudioPressed(song)}
                  key={song.id}
                />
              ))
            : favorites.map((song) => (
                <CustomCell
                  activeSong={currentSong}
                  song={song}
                  onAudioPressed={() => handleAudioPressed(song)}
                  key={song.id}
                />
              ))}
        </ScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  sheetBackgroundStyle: {
    backgroundColor: "#0E1013",
    shadowColor: "#b2b2b2",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  viewContainer: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingVertical: 50,
    paddingHorizontal: 25,
  },
  closeButtonContainer: {
    position: "absolute",
    right: 15,
    top: 5,
  },
});
