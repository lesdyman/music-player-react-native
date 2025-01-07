import { StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../data/store";
import { changeVolume } from "../features/Playback";

export const VolumeControl = () => {
  const volume = useSelector((state: RootState) => state.playback.volume);
  
  const progress = useSharedValue(volume);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  const dispatch = useDispatch<AppDispatch>();

  const handleVolumeChange = (value: number) => {
    dispatch(changeVolume(value));
  };

  return (
    <View style={styles.sliderView}>
      <Ionicons name="volume-low" size={20} color={"#797C7F"} />
      <Slider
        minimumValue={min}
        progress={progress}
        maximumValue={max}
        containerStyle={styles.sliderContainer}
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
  );
};

const styles = StyleSheet.create({
  sliderView: {
    flexDirection: "row",
    height: 30,
    width: "80%",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  sliderContainer: {
    backgroundColor: "#111216",
    borderWidth: 1,
    borderColor: "#383B46",
    borderRadius: 5,
    width: "100%",
  },
});
