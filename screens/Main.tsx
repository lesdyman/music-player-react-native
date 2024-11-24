import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "../components/ProgressBar";
import { ControlPanel } from "../components/ControlPanel";
import { useCallback, useMemo, useRef } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const customHandle = () => (
  <View
    style={{
      alignItems: "center",
      width: "100%",
      gap: 5,
      margin: 5,
    }}
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
      Pull up the song list
    </Text>
  </View>
);

export const Main = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snepPoints = useMemo(() => ["25%", "50%", "85%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

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
              <Image
                source={require("../assets/JD_alb.jpg")}
                style={styles.coverImage}
              />
            </LinearGradient>
          </View>
        </View>

        <ProgressBar />
        <View style={{ marginBottom: 10 }}>
          <ControlPanel />
        </View>

        {/* <TouchableWithoutFeedback onPress={handlePlayListOpen}>
        <View
          style={{
            alignItems: "center",
            width: "100%",
            gap: 5,
          }}
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
            open the song list
          </Text>
        </View>
        </TouchableWithoutFeedback> */}

        <BottomSheet
          index={0}
          ref={bottomSheetRef}
          snapPoints={snepPoints}
          onChange={handleSheetChanges}
          backgroundStyle={{ backgroundColor: "#000000" }}
          handleComponent={customHandle}
        >
          <BottomSheetView
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text>Hehe</Text>
          </BottomSheetView>
        </BottomSheet>
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
