import { useNavigation } from "@react-navigation/native";
import { NavigationButton } from "./NavigationButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/RootStackParamList";

export const CustomBackButton = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <NavigationButton
      icon_name="chevron-back"
      height={35}
      width={35}
      onPress={() => {
        navigation.navigate("StartScreen");
      }}
    />
  );
};
