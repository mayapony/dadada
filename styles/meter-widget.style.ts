import { DARK_THEME } from "constants/theme";
import { Dimensions, StyleSheet, ViewStyle } from "react-native";

const singleGap = 15;
const containerGap = singleGap * 3;

export const statedStyle = (active: boolean) => {
  let itemContainer: ViewStyle = {
    backgroundColor: DARK_THEME.surface0,
    width: (Dimensions.get("window").width * 0.9 - containerGap) * 0.25,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  };
  if (active) {
    itemContainer = {
      ...itemContainer,
      borderWidth: 2,
      borderColor: DARK_THEME.pink,
    };
  }

  return StyleSheet.create({
    itemContainer: itemContainer,
  });
};

export const styles = StyleSheet.create({
  outerContainer: {
    width: "90%",
    gap: singleGap,
    flexDirection: "row",
  },

  itemText: {
    color: DARK_THEME.text,
    fontSize: 16,
  },
});
