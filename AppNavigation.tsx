import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Main } from "./screens/Main";
import { CustomTitle } from "./components/CustomTitle";
import { useState } from "react";
import { StartScreen } from "./screens/StartScreen";
import { CustomBackButton } from "./components/CustomBackButton";
import { RootStackParamList } from "./types/RootStackParamList";
import { HeaderRightButton } from "./components/HeaderRightButton";

export const AppNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible((prevState) => !prevState);
    console.log("hehehe");
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
          options={() => ({
            headerTransparent: true,
            headerTintColor: "#FFF",
            headerBackVisible: false,
            headerTitle: "",
            headerLargeTitleStyle: {
              color: "#FFF",
              textTransform: "uppercase",
            },
          })}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={() => ({
            headerTransparent: true,
            headerShadowVisible: false,
            headerLeft: () => <CustomBackButton />,
            headerRight: () => (
              <HeaderRightButton
                isMenuVisible={isMenuVisible}
                toggleMenu={toggleMenu}
                setIsMenuVisible={setIsMenuVisible}
              />
            ),
            headerTitle: () => <CustomTitle />,
            headerTitleAlign: "center",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
