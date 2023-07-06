import React, { SetStateAction } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "styles/tempo-widget.style";
import { DARK_THEME } from "../constants/theme";

type TempoWidgetProps = {
  setTempo: (func: SetStateAction<number>) => void;
  tempo: number;
};

function TempoWidget({ setTempo, tempo }: TempoWidgetProps) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <ChangeTempoButton number={-1} setTempo={setTempo} />
        <ChangeTempoButton number={-5} setTempo={setTempo} />
      </View>
      <View style={styles.centerContainer}>
        <Text
          style={{ fontSize: 30, fontWeight: "bold", color: DARK_THEME.pink }}
        >
          {tempo}
        </Text>
        <Text
          style={{ fontSize: 15, fontWeight: "400", color: DARK_THEME.text }}
        >
          BPM
        </Text>
      </View>
      <View style={styles.buttonGroup}>
        <ChangeTempoButton number={1} setTempo={setTempo} />
        <ChangeTempoButton number={5} setTempo={setTempo} />
      </View>
    </View>
  );
}

function ChangeTempoButton({
  number,
  setTempo,
}: {
  number: number;
  setTempo: TempoWidgetProps["setTempo"];
}) {
  return (
    <TouchableOpacity
      style={styles.changeBtmButton}
      onPress={() => {
        setTempo((t) => t + number);
      }}
    >
      <Text style={{ fontSize: 18, color: DARK_THEME.text }}>{`${
        number > 0 ? "+" : ""
      }${number}`}</Text>
    </TouchableOpacity>
  );
}

export default TempoWidget;
