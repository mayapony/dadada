import debounce from "lodash/debounce";
import React, { useEffect, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "styles/tempo-widget.style";
import { MetronomeAction } from "types/metronome";
import { DARK_THEME } from "../constants/theme";

type TempoWidgetProps = {
  bpm: number;
  dispatch: React.Dispatch<MetronomeAction>;
};

function BPMWidget({ bpm, dispatch }: TempoWidgetProps) {
  const debouncedUpdateBPM = useMemo(
    () =>
      debounce(
        (increment: number) =>
          dispatch({ type: "UPDATE_BPM", payload: { bpm: bpm + increment } }),
        300
      ),
    [dispatch, bpm]
  );

  useEffect(() => {
    return () => {
      debouncedUpdateBPM.cancel();
    };
  }, [debouncedUpdateBPM]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <ChangeTempoButton increment={-1} updateBPM={debouncedUpdateBPM} />
        <ChangeTempoButton increment={-5} updateBPM={debouncedUpdateBPM} />
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
        <ChangeTempoButton increment={1} updateBPM={debouncedUpdateBPM} />
        <ChangeTempoButton increment={5} updateBPM={debouncedUpdateBPM} />
      </View>
    </View>
  );
}

function ChangeTempoButton({
  increment,
  updateBPM,
}: {
  increment: number;
  updateBPM: (bpm: number) => void;
}) {
  return (
    <TouchableOpacity
      style={styles.changeBtmButton}
      onPress={() => {
        updateBPM(increment);
      }}
    >
      <Text style={{ fontSize: 18, color: DARK_THEME.text }}>{`${
        increment > 0 ? "+" : ""
      }${increment}`}</Text>
    </TouchableOpacity>
  );
}

export default BPMWidget;
