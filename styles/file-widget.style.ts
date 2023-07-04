import { DARK_THEME } from "constants/theme";
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
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
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: "2%",
  },
  centerBottomContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  fileName: {
    color: DARK_THEME.pink,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
  },
});
