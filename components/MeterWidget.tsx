import { METERS } from "constants/meters";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { statedStyle, styles } from "styles/meter-widget.style";
import { Meter } from "types/meter.interface";

type MeterWidgetProps = {
  handleUpdateMeter: (meter: Meter) => void;
  meter: Meter;
};

function MeterWidget({ handleUpdateMeter, meter }: MeterWidgetProps) {
  return (
    <View style={styles.outerContainer}>
      {METERS.map((m) => {
        return (
          <TouchableOpacity
            key={m.numerator + m.numerator}
            style={
              statedStyle(
                meter.numerator === m.numerator &&
                  meter.denominator === m.denominator
              ).itemContainer
            }
            onPress={() => {
              handleUpdateMeter(m);
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

export default MeterWidget;
