import BeatStyleWidget from "components/BeatStyleWidget";
import BeatWidget from "components/BeatWidget";
import BPMWidget from "components/BMPWidget";
import TimeSignatureWidget from "components/TimeSignatureWidget";
import { DARK_THEME } from "constants/theme";
import { setBackgroundColorAsync } from "expo-system-ui";
import React, { useEffect, useReducer, useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { styles } from "styles/home.style";
import { BeatState } from "types/beat.interface";
import { MetronomeAction, MetronomeState } from "types/metronome";
import { bpmToMs } from "utils/index";
import { prepareSounds } from "utils/sound-manager";

const defaultMetronomeState: MetronomeState = {
  currentBeat: 1,
  subdivision: 1,
  bpm: 120,
  timeSignature: { numerator: 4, denominator: 4 },
  beatStyle: { value: 1, iconSource: 0 },
};

function metronomeReducer(
  state: MetronomeState,
  action: MetronomeAction
): MetronomeState {
  switch (action.type) {
    case "UPDATE_CURRENT_BEAT":
      return {
        ...state,
        currentBeat: action.payload.beat,
        subdivision: action.payload.subdivision,
      };

    case "UPDATE_BPM":
      return {
        ...state,
        bpm: action.payload.bpm,
      };

    case "UPDATE_TIME_SIGNATURE":
      return {
        ...state,
        timeSignature: {
          numerator: action.payload.numerator,
          denominator: action.payload.denominator,
        },
      };

    case "UPDATE_BEAT_STYLE":
      return {
        ...state,
        beatStyle: {
          value: action.payload.value,
          iconSource: action.payload.iconSource,
        },
      };

    case "RESET":
      return defaultMetronomeState;

    default:
      const unkonwnAction = action as { type: string };
      throw new Error(`Unhandled action type: ${unkonwnAction.type}`);
  }
}

const initBeatState: BeatState = {
  currentBeat: 1,
  currentSlice: 1,
};

function Home() {
  const [beatState, setBeatState] = useState<BeatState>(initBeatState);
  const [isStarted, setIsStarted] = useState(false);
  const [metronomeState, metronomeDispatch] = useReducer(
    metronomeReducer,
    defaultMetronomeState
  );

  async function handleStartPress() {
    // if started then stop
    if (isStarted) {
      setIsStarted((is) => !is);
      setBeatState(initBeatState);
    } else {
      // else then start
      await prepareSounds();
      setIsStarted((is) => !is);
    }
  }

  useEffect(function initState() {
    if (Platform.OS === "android") {
      // setBackgroundColorAsync(DARK_THEME.base);
      setBackgroundColorAsync(DARK_THEME.base);
    }
  }, []);

  useEffect(() => {
    setBeatState(initBeatState);
    let timer: null | number = null;

    if (isStarted) {
      console.log(bpmToMs(metronomeState.bpm) / metronomeState.beatStyle.value);
      timer = setInterval(
        () => {
          setBeatState((bs) => {
            if (bs.currentSlice >= metronomeState.beatStyle.value) {
              return {
                currentBeat:
                  bs.currentBeat + 1 > metronomeState.timeSignature.numerator
                    ? 1
                    : bs.currentBeat + 1,
                currentSlice: 1,
              };
            }
            return {
              ...bs,
              currentSlice: bs.currentSlice + 1,
            };
          });
        },
        bpmToMs(metronomeState.bpm) / metronomeState.beatStyle.value
      );
    } else {
      if (timer != null) clearInterval(timer);
    }

    return () => {
      if (timer != null) clearInterval(timer);
    };
  }, [isStarted, metronomeState]);

  return (
    <View style={styles.homeContainer}>
      <BeatWidget
        isStarted={isStarted}
        beatState={beatState}
        beatCount={metronomeState.timeSignature.numerator}
      />
      <TimeSignatureWidget
        dispatch={metronomeDispatch}
        timeSignature={metronomeState.timeSignature}
      />
      <BeatStyleWidget
        dispatch={metronomeDispatch}
        beatStyle={metronomeState.beatStyle}
      />
      <BPMWidget dispatch={metronomeDispatch} bpm={metronomeState.bpm} />
      <TouchableOpacity
        style={styles.switchButton}
        onPressIn={handleStartPress}
      >
        <Text style={styles.switchButtonText}>
          {isStarted ? "暂 停" : "开 始"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;
