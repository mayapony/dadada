import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles/home.style";

function Flag({ current }: { current: number }) {
  return (
    <View style={styles.iconsContainer}>
      {[1, 2, 3, 4].map((number) => {
        return (
          <View
            style={current === number ? styles.activeIcon : styles.icon}
            id={`block-${number}`}
            key={number}
          >
            <Text
              style={
                current === number ? styles.activeIconText : styles.iconText
              }
            >
              {number}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

export default Flag;
