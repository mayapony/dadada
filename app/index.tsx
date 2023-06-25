import { DARK_THEME } from "constants/theme";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { styles } from "styles/home.style";
import Home from "./Home";

export default function App() {
  NavigationBar.setBackgroundColorAsync(DARK_THEME.base);
  NavigationBar.setBorderColorAsync(DARK_THEME.base);

  return (
    <SafeAreaView style={styles.homeArea}>
      <Stack.Screen
        options={{
          headerTitle: "DADADA 🌸",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTintColor: DARK_THEME.text,
          headerStyle: {
            backgroundColor: DARK_THEME.base,
          },
        }}
      />
      <Home />
    </SafeAreaView>
  );
}
