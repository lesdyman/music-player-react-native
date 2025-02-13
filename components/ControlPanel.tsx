import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import { BasicButton } from "./BasicButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../data/store";
import { playbackControl, setCurrentSong } from "../features/Playback";

enum Direction {
  backward,
  forward,
}

export const ControlPanel = () => {

  const playback = useSelector((state: RootState) => state.playback.playback);
  const currentSong = useSelector((state: RootState) => state.playback.currentSong);
  const songs = useSelector((state: RootState) => state.songs.songs);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const playlist = useSelector((state: RootState) => state.playlist.playlist);

  const toPlay = playlist === 'all' ? songs : favorites;

  const dispatch = useDispatch<AppDispatch>();

  const handlePressPlay = () => {
    if (!currentSong) {
      return;
    }
    dispatch(playbackControl(currentSong));
  };

  const handleSongChange = (direction: Direction) => {

    if (!currentSong) {
      return
    }
    const currentSongIndex = toPlay.findIndex(
      (toPlay) => toPlay.id === currentSong?.id
    );

    if (direction === Direction.forward) {
      const newSong = toPlay[currentSongIndex + 1];

      if (currentSongIndex + 1 < toPlay.length) {
        setCurrentSong(newSong);
        dispatch(playbackControl(newSong));
      } else {
        return
      }
    }

    if (direction === Direction.backward) {
      const newSong = toPlay[currentSongIndex - 1];

      if (currentSongIndex - 1 >= 0) {
        setCurrentSong(newSong);
        dispatch(playbackControl(newSong));
      } else {
        return
      }
    }
  };

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
          onPress={() => handleSongChange(Direction.backward)}
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
          onPress={() => handleSongChange(Direction.forward)}
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
    borderRadius: 40,
  },
  playButtonBorderGradient: {
    borderRadius: 40,
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
    borderRadius: 42,
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
    borderRadius: 30,
  },
});
