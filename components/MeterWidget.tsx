import { METERS } from "constants/meters";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "styles/meter-widget.style";
import { Meter } from "types/meter.interface";

type MeterWidgetProps = {
  handleUpdateMeter: (meter: Meter) => void;
};

function MeterWidget({ handleUpdateMeter }: MeterWidgetProps) {
  return (
    <View style={styles.outerContainer}>
      <ScrollView
        showsHorizontalScrollIndicator={true}
        persistentScrollbar={true}
        contentContainerStyle={styles.container}
        horizontal
      >
        {METERS.map((meter) => {
          return (
            <TouchableOpacity
              key={meter.numerator + meter.numerator}
              style={styles.itemContainer}
              onPress={() => {
                handleUpdateMeter(meter);
              }}
            >
              <Text
                style={styles.itemText}
              >{`${meter.numerator}/${meter.denominator}`}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default MeterWidget;
