import { Dimensions, StyleSheet } from "react-native";
import { DARK_THEME } from "../constants/theme";

export const statedStyle = (radio: number, active: boolean) => {
  return StyleSheet.create({
    iconContainer: {
      backgroundColor: active ? DARK_THEME.pink : DARK_THEME.overlay0,
      borderRadius:
        Math.round(
          Dimensions.get("window").width + Dimensions.get("window").height
        ) / 2,
      width: Dimensions.get("window").width * radio,
      height: Dimensions.get("window").width * radio,
      justifyContent: "center",
      alignItems: "center",
    },
    iconText: {
      color: !active ? DARK_THEME.text : DARK_THEME.base,
      fontSize: 30,
    },
  });
};

export const styles = StyleSheet.create({
  homeArea: {
    flex: 1,
    backgroundColor: DARK_THEME.base,
    height: "100%",
  },
  homeContainer: {
    flexDirection: "column",
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
    width: "90%",
    marginHorizontal: "auto",
    marginTop: 10,
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
