import { PATTERNS } from "constants/patterns";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { statedStyle, styles } from "styles/pattern-widget.style";
import { BeatStyle, MetronomeAction } from "types/metronome";

interface BeatStyleWidgetProps {
  dispatch: React.Dispatch<MetronomeAction>;
  beatStyle: BeatStyle;
}

function BeatStyleWidget({ beatStyle, dispatch }: BeatStyleWidgetProps) {
  return (
    <View style={styles.container}>
      {PATTERNS.map((p, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={statedStyle(beatStyle.value === p.value).iconContainer}
            onPress={() => {
              dispatch({
                type: "UPDATE_BEAT_STYLE",
                payload: {
                  value: p.value,
                  iconSource: p.iconSource,
                },
              });
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

export default BeatStyleWidget;
