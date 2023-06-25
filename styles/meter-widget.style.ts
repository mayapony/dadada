import { DARK_THEME } from "constants/theme";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  outerContainer: {
    marginBottom: 10,
    height: 70,
  },

  container: {
    width: Dimensions.get("window").width * 0.85,
    marginBottom: 20,
    justifyContent: "space-between",
  },

  itemContainer: {
    backgroundColor: DARK_THEME.surface0,
    width: (Dimensions.get("window").width * 0.9 - 50) * 0.25,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  itemText: {
    color: DARK_THEME.text,
    fontSize: 16,
  },
});
