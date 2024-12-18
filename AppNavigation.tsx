import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Main } from "./screens/Main";
import { CustomTitle } from "./components/CustomTitle";
import { NavigationButton } from "./components/NavigationButton";
import { useState } from "react";
import { DropMenu } from "./components/DropMenu";
import { DropDownMenuOption } from "./components/DropDownMenuOption";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const AppNavigation = () => {
  const Stack = createNativeStackNavigator();

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible((prevState) => !prevState);
    console.log('hehehe')
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={Main}
          options={() => ({
            headerTransparent: true,
            headerLeft: () => (
              <NavigationButton
                icon_name="chevron-back"
                height={46}
                width={46}
              />
            ),
            headerRight: () => (
              <DropMenu
                visible={isMenuVisible}
                handleClose={toggleMenu}
                trigger={
                  <NavigationButton
                    icon_name="ellipsis-vertical-outline"
                    height={46}
                    width={46}
                    onPress={toggleMenu}
                  />
                }
              >
                <DropDownMenuOption
                  onSelect={() => {
                    console.log("Option 1 is selected");
                    setIsMenuVisible(false);
                  }}
                >
                  <View style={[styles.menuCell]}>
                    <Ionicons name="shuffle" size={20} color={"#999999"} />
                    <Text
                      style={{
                        color: "#999999",
                        fontSize: 15,
                        fontFamily: "RussoOne_400Regular",
                      }}
                    >
                      Play Shuffle
                    </Text>
                  </View>
                </DropDownMenuOption>
                <DropDownMenuOption
                  onSelect={() => {
                    console.log("Option 1 is selected");
                    setIsMenuVisible(false);
                  }}
                >
                  <View style={[styles.menuCell]}>
                    <Ionicons name="heart" size={20} color={"#FE251B"} />
                    <Text
                      style={{
                        color: "#999999",
                        fontSize: 15,
                        fontFamily: "RussoOne_400Regular",
                      }}
                    >
                      Play Favorites
                    </Text>
                  </View>
                </DropDownMenuOption>
              </DropMenu>
            ),
            headerTitle: () => <CustomTitle />,
            headerTitleAlign: "center",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  menuCell: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    gap: 10,
  },
});
