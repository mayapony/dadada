import { Dimensions, StyleSheet } from "react-native";
import { DARK_THEME } from "../constants/theme";

export const statedStyle = (active: boolean) => {
  return StyleSheet.create({
    iconContainer: {
      borderColor: active ? DARK_THEME.pink : DARK_THEME.base,
      borderWidth: 2,
      backgroundColor: DARK_THEME.surface0,
      borderRadius: 15,
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    iconText: {
      color: active ? DARK_THEME.pink : DARK_THEME.text,
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
    alignItems: "center",
    gap: 25,
  },
  iconsContainer: {
    backgroundColor: DARK_THEME.base,
    flexDirection: "row",
    display: "flex",
    gap: 10,
    borderRadius: 10,
    width: "90%",
    flexGrow: 1,
    marginHorizontal: "auto",
    marginTop: 10,
  },
  switchButton: {
    width: Dimensions.get("window").width * 0.9,
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
