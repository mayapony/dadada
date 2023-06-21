import { DARK_THEME } from "constants/theme";
import * as NavigationBar from "expo-navigation-bar";
import Home from "./Home";

export default function App() {
  NavigationBar.setBackgroundColorAsync(DARK_THEME.base);
  NavigationBar.setBorderColorAsync(DARK_THEME.base);

  return <Home />;
}
