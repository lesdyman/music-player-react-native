import { LinearGradient } from "expo-linear-gradient";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import {
  GestureHandlerRootView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useHeaderHeight } from "@react-navigation/elements";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRef } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../data/store";
import { setGenre } from "../features/AllSongs";

import { RootStackParamList } from "../types/RootStackParamList";
import { data } from "../utils/utils";

type Props = NativeStackScreenProps<RootStackParamList, "StartScreen">;

export const StartScreen: React.FC<Props> = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const headerHeight = useHeaderHeight();
  const scrollX = useRef(new Animated.Value(0)).current;

  const dispatch = useDispatch<AppDispatch>();

  return (
    <GestureHandlerRootView>
      <View style={styles.viewContainer}>
        <LinearGradient
          colors={["#2C3137", "#17191D"]}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Animated.FlatList
            data={data}
            horizontal
            bounces={false}
            keyExtractor={(item) => item.id}
            decelerationRate="fast"
            snapToInterval={width + 5}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ];
              const translateX = scrollX.interpolate({
                inputRange,
                outputRange: [-width * 0.7, 0, width * 0.7],
              });
              return (
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate("Main");
                    dispatch(setGenre(item.title));
                  }}
                >
                  <View
                    style={[
                      styles.cardShadow,
                      {
                        marginTop: headerHeight,
                        height: height * 0.8,
                        width: width,
                      },
                    ]}
                  >
                    <View style={styles.card}>
                      <Animated.Image
                        source={item.image}
                        style={{
                          height: height,
                          width: width * 1.4,
                          resizeMode: "cover",
                          borderRadius: 40,
                          transform: [
                            {
                              translateX,
                            },
                          ],
                        }}
                      />
                      <Text style={styles.cardText}>{item.title}</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
          />
        </LinearGradient>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: "center",
  },
  cardShadow: {
    shadowColor: "#FFF",
    shadowOffset: { width: 2, height: 1 },
    shadowRadius: 20,
    shadowOpacity: 0.6,
    elevation: 20,
    marginHorizontal: 2,
  },
  card: {
    height: "100%",
    width: "100%",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    overflow: "hidden",
    borderRadius: 50,
    elevation: 10,
  },
  cardText: {
    fontSize: 50,
    color: "#F0F0F0",
    fontFamily: "RussoOne_400Regular",
    textTransform: "uppercase",
    position: "absolute",
    width: "100%",
    top: 20,
    left: 30,
    shadowColor: "#E34715",
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 0.6,
    shadowOffset: { width: 2, height: 1 },
  },
});
