import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { BeatState } from "types/beat.interface";
import { playLowSound, playMidSound } from "utils/sound-manager";
import { statedStyle, styles } from "../styles/home.style";

function BeatWidget({
  beatState,
  beatCount,
  isStarted,
}: {
  beatState: BeatState;
  beatCount: number;
  isStarted: boolean;
}) {
  const flags = Array.from({ length: beatCount }, (_, i) => i + 1);

  useEffect(() => {
    if (isStarted) {
      beatState.currentSlice === 1 ? playMidSound() : playLowSound();
    }
  }, [beatState, isStarted]);

  return (
    <View style={styles.iconsContainer}>
      {flags.map((number) => {
        return (
          <View
            style={statedStyle(beatState.currentBeat === number).iconContainer}
            id={`block-${number}`}
            key={number}
          >
            <Text
              style={statedStyle(beatState.currentBeat === number).iconText}
            >
              {number}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

export default BeatWidget;
