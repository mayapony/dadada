import { StyleSheet } from "react-native";
import { DARK_THEME } from "../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "90%",
    margin: "auto",
    gap: 15,
  },
  buttonGroup: {
    flexDirection: "column",
    flexGrow: 1,
    height: "100%",
    gap: 10,
  },
  centerContainer: {
    height: 120,
    flexGrow: 2,
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
