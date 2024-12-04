import { Text, View } from "react-native";
import * as Progress from "react-native-progress";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../data/store";
import { useEffect, useRef, useState } from "react";

export const ProgressBar = () => {
  const { currentSong, playback } = useSelector(
    (state: RootState) => state.playback
  );

  const [timePassed, setTimePassed] = useState(0);

  const whatIsPlaying = useRef(currentSong);

  const timer = () => {
    if (currentSong && playback) {
      const interval = setInterval(() => {
        setTimePassed((prevTime) => {
          const newTime = prevTime + 1;
          if (newTime >= currentSong.duration) {
            clearInterval(interval);
          }
          return newTime;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  };

  useEffect(() => {
    if (currentSong?.id !== whatIsPlaying.current?.id) {
      setTimePassed(0);
    }

    whatIsPlaying.current = currentSong;

    if (playback) {
      return timer();
    } else {
      return;
    }
  }, [playback, currentSong]);

  const progress = currentSong?.duration
    ? timePassed / currentSong.duration
    : 0;

  const timeFormater = (time: number) => {
    let minutes = 0;
    let seconds = 0;

    if (currentSong) {
      minutes = Math.floor(time / 60);
      seconds = time % 60;
    }
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View style={styles.progressBarBlock}>
      <Text style={styles.timerText}>{timeFormater(timePassed)}</Text>
      <View style={styles.progressBarShadow}>
        <Progress.Bar
          color="#FF611A"
          unfilledColor="#1b1b1b"
          borderColor="#CB340D"
          borderWidth={1}
          width={230}
          height={5}
          progress={progress}
        />
      </View>
      <Text style={styles.timerText}>
        {currentSong?.duration
          ? timeFormater(currentSong.duration - timePassed)
          : "00:00"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerText: {
    color: "#666666",
    fontFamily: "RussoOne_400Regular",
    width: 45,
    textAlign: "center",
  },
  progressBarBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    width: "100%",
  },

  progressBarShadow: {
    height: 5,
    shadowColor: "#CB340D",
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    elevation: 5,
  },
});
