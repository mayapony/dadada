import BeatWidget from "components/BeatWidget";
import FileWidget from "components/FileWidget";
import MeterWidget from "components/MeterWidget";
import PatternWidget from "components/PatternWidget";
import TempoWidget from "components/TempoWidget";
import { METERS } from "constants/meters";
import { PATTERNS } from "constants/patterns";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "styles/home.style";
import { BeatState } from "types/beat.interface";
import { Meter } from "types/meter.interface";
import { bpmToMs } from "utils/index";
import { prepareSounds, setSoundsRate } from "utils/sound-manager";

const initBeatState: BeatState = {
  currentBeat: 1,
  currentSlice: 1,
};

function Home() {
  const [beatState, setBeatState] = useState<BeatState>(initBeatState);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [tempo, setTempo] = useState(60);
  const [isStarted, setIsStarted] = useState(false);
  const [meter, setMeter] = useState<Meter>(METERS[3]);
  const [pattern, setPattern] = useState(PATTERNS[0]);

  useEffect(() => {
    setBeatState(initBeatState);
    if (isStarted) {
      const intervalTime = bpmToMs(tempo) / pattern.value;
      setSoundsRate(intervalTime);
      updateInterval();
    }
  }, [meter, pattern, tempo]);

  async function handleStartPress() {
    // if started then stop
    if (isStarted) {
      if (intervalId) clearInterval(intervalId);
      setIntervalId(null);
      setIsStarted((is) => !is);
      setBeatState(initBeatState);
    } else {
      // else then start
      await prepareSounds();
      const intervalTime = bpmToMs(tempo) / pattern.value;
      setSoundsRate(intervalTime);
      setIsStarted((is) => !is);
      updateInterval();
    }
  }

  function updateInterval() {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    const interval = setInterval(() => {
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
    }, bpmToMs(tempo) / pattern.value);

    setIntervalId(interval);
  }

  return (
    <View style={styles.homeContainer}>
      <BeatWidget
        isStarted={isStarted}
        beatState={beatState}
        beatCount={meter.numerator}
      />
      <FileWidget />
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
