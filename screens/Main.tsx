import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "../components/ProgressBar";
import { ControlPanel } from "../components/ControlPanel";
import { useMemo, useRef } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {
  GestureHandlerRootView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { BasicButton } from "../components/BasicButton";
import { CustomHandle } from "../components/СustomHandle";
import { BasicCell } from "../components/BasicCell";

export const Main = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handlePlaylistOpen = () => bottomSheetRef.current?.expand();
  const handlePlaylistClose = () => bottomSheetRef.current?.close();

  const snepPoints = useMemo(() => ["25%", "50%", "85%"], []);

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
              <Image
                source={require("../assets/JD_alb.jpg")}
                style={styles.coverImage}
              />
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

        <BottomSheet
          index={-1}
          ref={bottomSheetRef}
          snapPoints={snepPoints}
          // onChange={handleSheetChanges}
          handleComponent={CustomHandle}
          enablePanDownToClose
          backgroundStyle={{
            backgroundColor: "#0E1013",
            shadowColor: "#b2b2b2",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.5,
            shadowRadius: 3,
            elevation: 3,
          }}
        >
          <BottomSheetView
            style={{
              flex: 1,
              position: "relative",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
              paddingVertical: 50,
              paddingHorizontal: 25,
            }}
          >
            {/* CLOSE BUTTON */}
            <View
              style={{
                position: "absolute",
                right: 15,
                top: 5,
              }}
            >
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

            {/* PLAYLIST MARKUP */}
            <BasicCell author="the cure" songTitle="fascination street" />

            {/* CELL PLAYED */}

            <LinearGradient
              colors={["#FF611A", "#000000"]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0.5, y: 0.5 }}
              style={{
                height: 60,
                width: "100%",
                justifyContent: "center",
                // alignItems: 'center',
                borderTopEndRadius: 30,
                borderBottomEndRadius: 30,
              }}
            >
              <View
                style={{
                  height: 58,
                  width: "99.7%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderTopEndRadius: 30,
                  borderBottomEndRadius: 30,
                  padding: 5,
                  backgroundColor: "#000",
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                    width: "auto",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#999999",
                      fontFamily: "RussoOne_400Regular",
                      textTransform: "uppercase",
                    }}
                  >
                    love will tear us appart
                  </Text>
                  <Text
                    style={{
                      color: "#666666",
                      fontSize: 12,
                      fontFamily: "RussoOne_400Regular",
                      textTransform: "uppercase",
                    }}
                  >
                    joy devision
                  </Text>
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <LinearGradient
                    colors={["#FF9465", "#AF1905"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      borderRadius: "50%",
                      height: 30,
                      width: 30,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <BasicButton
                      icon_name={"pause"}
                      height={26}
                      width={26}
                      color={"#FFFFFF"}
                      bColor={"#D6361F"}
                      size={20}
                    />
                  </LinearGradient>
                </View>
              </View>
            </LinearGradient>
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
