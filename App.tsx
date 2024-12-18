import { Provider } from "react-redux";
import { AppNavigation } from "./AppNavigation";
import store from "./data/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
