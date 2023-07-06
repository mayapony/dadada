import { DARK_THEME } from "constants/theme";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 150,
    backgroundColor: DARK_THEME.surface0,
    width: Dimensions.get("window").width * 0.9,
    borderRadius: 15,
  },
  columnContainer: {
    width: Dimensions.get("window").width * 0.9 * 0.18,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContainer: {
    width: Dimensions.get("window").width * 0.9 * (1 - 0.36),
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: "2%",
  },
  centerBottomContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  textContainer: {
    borderRadius: 10,
    paddingVertical: 10,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 5,
  },
  fileName: {
    color: DARK_THEME.pink,
    fontSize: 20,
    fontWeight: "bold",
  },
  time: {
    color: "white",
    fontSize: 15,
  },
  btnIconContainer: {
    backgroundColor: "blue",
  },
});
