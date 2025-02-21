import { Provider } from "react-redux";
import { AppNavigation } from "./AppNavigation";
import store from "./data/store";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <AppNavigation />
    </Provider>
  );
}
