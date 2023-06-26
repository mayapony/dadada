import { PATTERNS } from "constants/patterns";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { statedStyle, styles } from "styles/pattern-widget.style";
import { PatternIcon } from "types/pattern-icon.interface";

type PatternWidgetProps = {
  handleUpdatePattern: (pattern: PatternIcon) => void;
  pattern: PatternIcon;
};

function PatternWidget({ pattern, handleUpdatePattern }: PatternWidgetProps) {
  return (
    <View style={styles.container}>
      {PATTERNS.map((p, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={statedStyle(pattern.value === p.value).iconContainer}
            onPress={() => {
              handleUpdatePattern(p);
            }}
          >
            <Image
              source={p.iconSource}
              style={styles.icon}
              resizeMethod="resize"
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default PatternWidget;
