import { Dimensions, StyleSheet } from "react-native";
import { DARK_THEME } from "../constants/theme";

export const styles = StyleSheet.create({
  homeArea: {
    flex: 1,
    backgroundColor: DARK_THEME.base,
    height: "100%",
  },
  homeContainer: {
    flexDirection: "column",
    paddingLeft: 10,
    paddingRight: 10,
    height: "100%",
    justifyContent: "space-between",
  },
  iconsContainer: {
    backgroundColor: DARK_THEME.surface0,
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-evenly",
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 10,
  },
  icon: {
    backgroundColor: DARK_THEME.overlay0,
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.18,
    height: Dimensions.get("window").width * 0.18,
    justifyContent: "center",
    alignItems: "center",
  },
  activeIcon: {
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.18,
    height: Dimensions.get("window").width * 0.18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: DARK_THEME.pink,
  },
  iconText: {
    fontSize: 30,
    fontWeight: "bold",
    color: DARK_THEME.text,
  },
  activeIconText: {
    fontSize: 30,
    fontWeight: "bold",
    color: DARK_THEME.base,
  },
  switchButton: {
    width: "90%",
    paddingTop: 20,
    paddingBottom: 20,
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: DARK_THEME.surface0,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  switchButtonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: DARK_THEME.pink,
  },
});
