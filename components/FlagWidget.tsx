import React from "react";
import { Text, View } from "react-native";
import { statedStyle, styles } from "../styles/home.style";

function FlagWidget({
  current,
  flagCount,
}: {
  current: number;
  flagCount: number;
}) {
  const flags = Array.from({ length: flagCount }, (_, i) => i + 1);
  const radio = 0.18;

  return (
    <View style={styles.iconsContainer}>
      {flags.map((number) => {
        return (
          <View
            style={statedStyle(radio, current === number).iconContainer}
            id={`block-${number}`}
            key={number}
          >
            <Text style={statedStyle(radio, current === number).iconText}>
              {number}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

export default FlagWidget;
