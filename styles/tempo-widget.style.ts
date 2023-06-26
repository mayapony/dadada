import { Dimensions, StyleSheet } from "react-native";
import { DARK_THEME } from "../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "90%",
    margin: "auto",
    gap: 15,
    marginBottom: 30,
  },
  buttonGroup: {
    flexDirection: "column",
    // flexGrow: 1,
    width: (Dimensions.get("window").width * 0.9 - 50) * 0.25,
    height: "100%",
    gap: 10,
  },
  centerContainer: {
    height: 120,
    flexGrow: 1,
    backgroundColor: DARK_THEME.surface0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  changeBtmButton: {
    color: DARK_THEME.text,
    backgroundColor: DARK_THEME.surface0,
    flexGrow: 1,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
