import { DARK_THEME } from "constants/theme";
import { Dimensions, StyleSheet, ViewStyle } from "react-native";

const singleGap = 15;
const containerGap = singleGap * 3;

export const statedStyle = (active: boolean) => {
  let iconContainer: ViewStyle = {
    backgroundColor: DARK_THEME.surface0,
    width: (Dimensions.get("window").width * 0.9 - containerGap) * 0.25,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  };
  if (active) {
    iconContainer = {
      ...iconContainer,
      borderWidth: 2,
      borderColor: DARK_THEME.pink,
    };
  }

  return StyleSheet.create({
    iconContainer,
  });
};

export const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width * 0.9,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  icon: {
    height: 16,
    resizeMode: "contain",
    width: 32,
  },
});
