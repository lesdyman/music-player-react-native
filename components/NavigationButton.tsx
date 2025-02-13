import React from "react";
import { StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { BasicButton } from "./BasicButton";

interface Props {
  icon_name: keyof typeof Ionicons.glyphMap;
  height: number;
  width: number;
  onPress?: () => void;
}

export const NavigationButton: React.FC<Props> = ({ icon_name, height, width, onPress }) => (
  <View
    style={[styles.buttonShadowUp, { height: height + 2, width: width + 2, borderRadius: (height + 2) / 2 }]}
  >
    <View style={[styles.buttonShadowDown, { borderRadius: (height + 2) / 2 }]}>
      <LinearGradient
        colors={["#40454A", "#202329"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.navButtonBorder, { borderRadius: height / 2 }]}
      >
        <BasicButton
          icon_name={icon_name}
          width={width}
          height={height}
          color="#797C7F"
          bColor="#2E3339"
          size={20}
          onPress={onPress}
        />
      </LinearGradient>
    </View>
  </View>
);

const styles = StyleSheet.create({
  navButtonBorder: {
    width: "100%",
    height: "100%",
  },

  buttonShadowUp: {
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#40454A",
    shadowOffset: { width: -2, height: -3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonShadowDown: {
    height: "100%",
    width: "100%",
    shadowColor: "#0F1314",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
});