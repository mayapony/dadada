import { DARK_THEME } from "constants/theme";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width * 0.85,
    height: 80,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  itemContainer: {
    backgroundColor: DARK_THEME.surface0,
    width: (Dimensions.get("window").width * 0.9 - 50) * 0.25,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: 16,
    resizeMode: "contain",
    width: 32,
  },
});
