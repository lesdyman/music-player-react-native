import { Provider } from "react-redux";
import { AppNavigation } from "./AppNavigation";
import store from "./data/store";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
