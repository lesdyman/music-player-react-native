import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Track } from "../types/Track";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../data/store";
import { addRemoveFavorite } from "../features/Favorites";

interface Props {
  song: Track;
  activeSong: Track | null;
  onAudioPressed: () => void;
}

export const CustomCell: React.FC<Props> = ({
  song,
  activeSong,
  onAudioPressed,
}) => {
  const isActive = activeSong?.id === song.id;

  const { playback } = useSelector((state: RootState) => state.playback);
  const { favorites } = useSelector((state: RootState) => state.favorites);

  const dispatch = useDispatch();

  return (
    <LinearGradient
      colors={
        isActive
          ? ["#FF611A", "#000000"]
          : ["#0E1013", "#0E1013", "transparent"]
      }
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.cellContainer, isActive && styles.activeContainer]}
    >
      <View style={styles.songInfoContainer}>
        <Text
          style={isActive ? styles.activeSongTitle : styles.songTitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {song.name}
        </Text>
        <Text style={isActive ? styles.activeAuthor : styles.author}>
          {song.artist_name}
        </Text>
      </View>

      <TouchableWithoutFeedback
        onPress={() => {
          dispatch(addRemoveFavorite(song));
          console.log(favorites.length);
        }}
      >
        {favorites.some((favSong) => favSong.id === song.id) ? (
          <Ionicons name="heart" size={22} color={"#e31b23"} />
        ) : (
          <Ionicons name="heart-outline" size={22} color={"#e31b23"} />
        )}
      </TouchableWithoutFeedback>

      <TouchableOpacity
        onPress={async () => {
          await onAudioPressed();
        }}
      >
        <LinearGradient
          colors={isActive ? ["#FF9465", "#AF1905"] : ["#41464B", "#0E1013"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.playButtonGradient}
        >
          <Ionicons
            name={playback && isActive ? "pause" : "play"}
            size={20}
            color={isActive ? "#FFF" : "#797C7F"}
          />
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cellContainer: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    padding: 5,
    alignItems: "center",
  },
  activeContainer: {
    height: 60,
    width: "100%",
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    alignItems: "center",
  },
  songInfoContainer: {
    justifyContent: "center",
    alignContent: "center",
    width: "75%",
  },
  songTitle: {
    fontSize: 14,
    color: "#999999",
    fontFamily: "RussoOne_400Regular",
    textTransform: "uppercase",
    width: "85%",
  },
  activeSongTitle: {
    fontSize: 14,
    color: "#999999",
    fontFamily: "RussoOne_400Regular",
    textTransform: "uppercase",
  },
  author: {
    color: "#666666",
    fontSize: 12,
    fontFamily: "RussoOne_400Regular",
    textTransform: "uppercase",
  },
  activeAuthor: {
    color: "#666666",
    fontSize: 12,
    fontFamily: "RussoOne_400Regular",
    textTransform: "uppercase",
  },
  playButtonGradient: {
    borderRadius: "50%",
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
