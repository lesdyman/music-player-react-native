import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  onSelect: () => void;
  children: React.ReactNode;
}

export const DropDownMenuOption: React.FC<Props> = ({ onSelect, children }) => {
  return (
    <TouchableOpacity onPress={onSelect} style={styles.option}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    padding: 5,
  },
});
