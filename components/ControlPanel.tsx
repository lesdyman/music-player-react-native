import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import { BasicButton } from "./BasicButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../data/store";
import { setPlayback } from "../features/Playback";

export const ControlPanel = () => {
  const { playback } = useSelector((state: RootState) => state.playback);
  const { currentSong } = useSelector((state: RootState) => state.currentSong);

  const dispatch = useDispatch<AppDispatch>();

  const handlePressPlay = () => {
    if (!currentSong) {
      return
    }
    dispatch(setPlayback(!playback));
  };

  const handlePreviousTrack = () => {};

  const handleNextTrack = () => {};

  return (
    <View style={styles.controlPanel}>
      <LinearGradient
        colors={["rgba(14, 16, 19, 1)", "rgba(185, 61, 9, 0.5)"]}
        start={{ x: 0.4, y: 0.2 }}
        end={{ x: 0.5, y: 0.1 }}
        style={styles.controlButtonShadow}
      >
        <BasicButton
          icon_name="play-skip-back"
          width={56}
          height={56}
          size={20}
          color="#979797"
          bColor="#1A1C20"
          onPress={handlePreviousTrack}
        />
      </LinearGradient>

      <View style={styles.playButtonRedShadow}>
        <LinearGradient
          colors={["#FF9465", "#AF1905"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.playButtonBorderGradient}
        >
          <LinearGradient
            colors={["#EC540E", "#D6361F"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.playButtonBorder}
          >
            <BasicButton
              icon_name={playback === false ? "play" : "pause"}
              width={80}
              height={80}
              size={30}
              color="#FFF"
              bColor="transparent"
              onPress={handlePressPlay}
            />
          </LinearGradient>
        </LinearGradient>
      </View>

      <LinearGradient
        colors={["rgba(185, 61, 9, 0.5)", "rgba(14, 16, 19, 1)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 0.1 }}
        style={styles.controlButtonShadow}
      >
        <BasicButton
          icon_name="play-skip-forward"
          width={56}
          height={56}
          size={20}
          color="#979797"
          bColor="#1A1C20"
          onPress={handleNextTrack}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  controlPanel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 25,
  },

  playButtonBorder: {
    borderRadius: "50%",
  },
  playButtonBorderGradient: {
    borderRadius: "50%",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  playButtonRedShadow: {
    height: 84,
    width: 84,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    shadowColor: "#AF1905",
    shadowOffset: { width: -3, height: -4 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },

  controlButtonShadow: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
  },
});
