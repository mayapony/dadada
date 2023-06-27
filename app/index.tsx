import { DARK_THEME } from "constants/theme";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import { styles } from "styles/home.style";
import Home from "./Home";

export default function App() {
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
