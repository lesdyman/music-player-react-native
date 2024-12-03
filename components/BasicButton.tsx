import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  icon_name: keyof typeof Ionicons.glyphMap;
  height: number;
  width: number;
  color: string;
  bColor: string;
  size: number;
  onPress?: () => void;
}

export const BasicButton: React.FC<Props> = ({
  height,
  width,
  size,
  icon_name,
  color,
  bColor,
  onPress
}) => (
  <TouchableOpacity
  onPress={onPress}
    style={[
      styles.button,
      { width: width, height: height, backgroundColor: bColor },
    ]}
  >
    <Ionicons name={icon_name} size={size} color={color} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});
