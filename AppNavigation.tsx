import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Main } from "./screens/Main";
import { CustomTitle } from "./components/CustomTitle";
import { NavigationButton } from "./components/NavigationButton";

export const AppNavigation = () => {
  const Stack = createNativeStackNavigator();

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
              <NavigationButton
                icon_name="ellipsis-vertical-outline"
                height={46}
                width={46}
              />
            ),
            headerTitle: () => <CustomTitle />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
