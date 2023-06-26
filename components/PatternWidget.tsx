import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { styles } from "styles/pattern-widget.style";

const iconAsserts = [
  require("../assets/icons/note1.png"),
  require("../assets/icons/note2.png"),
  require("../assets/icons/note3.png"),
  require("../assets/icons/note4.png"),
];

function PatternWidget() {
  return (
    <View style={styles.container}>
      {iconAsserts.map((icon, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.itemContainer}
            onPress={() => {
              return index;
            }}
          >
            <Image source={icon} style={styles.icon} resizeMethod="resize" />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default PatternWidget;
