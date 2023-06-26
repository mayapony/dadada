import { DARK_THEME } from "constants/theme";
import { Dimensions, StyleSheet, ViewStyle } from "react-native";

export const statedStyle = (active: boolean) => {
  let itemContainer: ViewStyle = {
    backgroundColor: DARK_THEME.surface0,
    width: (Dimensions.get("window").width * 0.9 - 50) * 0.25,
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
