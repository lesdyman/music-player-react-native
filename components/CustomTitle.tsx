import { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Inconsolata_400Regular,
} from "@expo-google-fonts/inconsolata";
import { RussoOne_400Regular } from "@expo-google-fonts/russo-one";
import { Poppins_400Regular } from "@expo-google-fonts/poppins";
import { RootState } from "../data/store";
import { useSelector } from "react-redux";


export const CustomTitle = () => {

  const currentSong = useSelector((state: RootState) => state.playback.currentSong)

  const animation = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get('screen');

  const startAnimation = () => {
    const screenWidth = width;

    Animated.loop(
      Animated.sequence(
        [
          Animated.timing(animation, {
            toValue: -screenWidth,
            duration: 9000,
            useNativeDriver: true,
            delay: 5000,
          }),
        ]
      )
    ).start()
  }

  useEffect(() => {
    startAnimation()
  },[])


  let [fontsLoaded] = useFonts({
    Inconsolata_400Regular,
    RussoOne_400Regular,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return
  }

  return (
    <View style={styles.titleContainer}>
      <Animated.Text
      numberOfLines={1}
      style={[
        styles.titleTop,
        {
          transform: [{translateX: animation}]
        }
      ]}
      >
        {currentSong?.name}
      </Animated.Text>
      <Animated.Text
      numberOfLines={1}
      style={[
        styles.titleTop,
        {
          transform: [{translateX: Animated.add(animation, width)}]
        }
      ]}
      >
        {currentSong?.name}
      </Animated.Text>

      <Text style={styles.titleBottom} numberOfLines={1}>
       {currentSong?.artist_name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    width: 250,
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  titleTop: {
    position: 'absolute',
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
    color: "#999999",
    width: '100%',
    textAlign: "center",
    textTransform: "capitalize",
  },
  titleBottom: {
    fontSize: 16,
    fontFamily: "RussoOne_400Regular",
    color: "#666666",
    width: "99%",
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: 25,
  },
});
