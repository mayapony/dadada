import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DARK_THEME } from "../constants/theme";
import { styles } from "../styles/bpm-changer.style";

type BpmChangerProps = {
  handleUpdateBpm: (increment: number) => void;
  bpm: number;
};

function BpmChanger({ handleUpdateBpm, bpm }: BpmChangerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <ChangeBpmButton number={-1} handleUpdateBpm={handleUpdateBpm} />
        <ChangeBpmButton number={-5} handleUpdateBpm={handleUpdateBpm} />
      </View>
      <View style={styles.centerContainer}>
        <Text
          style={{ fontSize: 30, fontWeight: "bold", color: DARK_THEME.pink }}
        >
          {bpm}
        </Text>
        <Text
          style={{ fontSize: 15, fontWeight: "400", color: DARK_THEME.text }}
        >
          BPM
        </Text>
      </View>
      <View style={styles.buttonGroup}>
        <ChangeBpmButton number={1} handleUpdateBpm={handleUpdateBpm} />
        <ChangeBpmButton number={5} handleUpdateBpm={handleUpdateBpm} />
      </View>
    </View>
  );
}

function ChangeBpmButton({ number, handleUpdateBpm }) {
  return (
    <TouchableOpacity
      style={styles.changeBtmButton}
      onPress={() => {
        handleUpdateBpm(number);
      }}
    >
      <Text style={{ fontSize: 20, color: DARK_THEME.text }}>{`${
        number > 0 ? "+" : ""
      }${number}`}</Text>
    </TouchableOpacity>
  );
}

export default BpmChanger;
