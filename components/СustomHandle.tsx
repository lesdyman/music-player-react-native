import { View, Image, Text, StyleSheet } from "react-native";

export const СustomHandle = () => (
  <View style={styles.container}>
    <Image source={require("../assets/pull-icon.png")} style={styles.image} />

    <Text style={styles.text}>Pull up the song list</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    gap: 5,
    margin: 5,
  },
  image: {
    height: 5,
    width: "100%",
    objectFit: "contain",
  },
  text: {
    color: "#666666",
    fontSize: 12,
    fontFamily: "RussoOne_400Regular",
    textTransform: "uppercase",
  },
});
