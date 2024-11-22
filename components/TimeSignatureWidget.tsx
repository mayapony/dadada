import { METERS } from "constants/meters";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { statedStyle, styles } from "styles/meter-widget.style";
import { MetronomeAction, TimeSignature } from "types/metronome";

interface MeterWidgetProps {
  timeSignature: TimeSignature;
  dispatch: React.Dispatch<MetronomeAction>;
}

function TimeSignatureWidget({ timeSignature, dispatch }: MeterWidgetProps) {
  return (
    <View style={styles.outerContainer}>
      {METERS.map((m) => {
        return (
          <TouchableOpacity
            key={m.numerator + m.numerator}
            style={
              statedStyle(
                timeSignature.numerator === m.numerator &&
                  timeSignature.denominator === m.denominator
              ).itemContainer
            }
            onPress={() => {
              dispatch({
                type: "UPDATE_TIME_SIGNATURE",
                payload: {
                  numerator: m.numerator,
                  denominator: m.denominator,
                },
              });
            }}
          >
            <Text
              style={styles.itemText}
            >{`${m.numerator}/${m.denominator}`}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default TimeSignatureWidget;
