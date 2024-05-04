import BeatWidget from "components/BeatWidget";
import MeterWidget from "components/MeterWidget";
import PatternWidget from "components/PatternWidget";
import TempoWidget from "components/TempoWidget";
import { METERS } from "constants/meters";
import { PATTERNS } from "constants/patterns";
import { DARK_THEME } from "constants/theme";
import { initRecordTable } from "db/index";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { styles } from "styles/home.style";
import { BeatState } from "types/beat.interface";
import { Meter } from "types/meter.interface";
import { bpmToMs } from "utils/index";
import { prepareSounds } from "utils/sound-manager";
import { setBackgroundColorAsync } from "expo-system-ui";

const initBeatState: BeatState = {
  currentBeat: 1,
  currentSlice: 1,
};

function Home() {
  const [beatState, setBeatState] = useState<BeatState>(initBeatState);
  const [tempo, setTempo] = useState(60);
  const [isStarted, setIsStarted] = useState(false);
  const [meter, setMeter] = useState<Meter>(METERS[3]);
  const [pattern, setPattern] = useState(PATTERNS[0]);

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
    // init database
    initRecordTable();

    // set navigator bar background color
    if (Platform.OS === "android") {
      // setBackgroundColorAsync(DARK_THEME.base);
      setBackgroundColorAsync(DARK_THEME.base);
    }
  }, []);

  useEffect(() => {
    setBeatState(initBeatState);
    let timer: null | number = null;

    if (isStarted) {
      console.log(bpmToMs(tempo) / pattern.value);
      timer = setInterval(
        () => {
          setBeatState((bs) => {
            if (bs.currentSlice >= pattern.value) {
              return {
                currentBeat:
                  bs.currentBeat + 1 > meter.numerator ? 1 : bs.currentBeat + 1,
                currentSlice: 1,
              };
            }
            return {
              ...bs,
              currentSlice: bs.currentSlice + 1,
            };
          });
        },
        bpmToMs(tempo) / pattern.value,
      );
    } else {
      if (timer != null) clearInterval(timer);
    }

    return () => {
      if (timer != null) clearInterval(timer);
    };
  }, [isStarted, meter.numerator, pattern.value, tempo]);

  return (
    <View style={styles.homeContainer}>
      <BeatWidget
        isStarted={isStarted}
        beatState={beatState}
        beatCount={meter.numerator}
      />
      <MeterWidget handleUpdateMeter={setMeter} meter={meter} />
      <PatternWidget pattern={pattern} handleUpdatePattern={setPattern} />
      <TempoWidget tempo={tempo} setTempo={setTempo} />
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
