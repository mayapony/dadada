import FlagWidget from "components/FlagWidget";
import MeterWidget from "components/MeterWidget";
import PatternWidget from "components/PatternWidget";
import TempoWidget from "components/TempoWidget";
import { PATTERNS } from "constants/patterns";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "styles/home.style";
import { Meter } from "types/meter.interface";
import { bpmToMs } from "utils/index";
import { prepareSounds, soundAudio, unloadSounds } from "utils/sound-manager";

function Home() {
  const [current, setCurrent] = useState(1);
  const [intervalId, setIntervalId] = useState<null | number>(null);
  const [tempo, setTempo] = useState(60);
  const [isStarted, setIsStarted] = useState(false);
  const [meter, setMeter] = useState<Meter>({
    numerator: 4,
    denominator: 4,
  });
  const [pattern, setPattern] = useState(PATTERNS[0]);

  useEffect(() => {
    if (current > meter.numerator) setCurrent(1);
    if (isStarted) updateInterval();
  }, [meter, pattern, tempo]);

  async function handleStartPress() {
    // if started then stop
    if (isStarted) {
      console.log("Unloading Sound");
      if (intervalId) clearInterval(intervalId);
      unloadSounds();
      setIntervalId(null);
      setCurrent(1);
    } else {
      // else then start
      await prepareSounds();
      updateInterval();
    }

    setIsStarted((is) => !is);
  }

  function updateInterval() {
    let isFirst = true;

    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    const interval = setInterval(async () => {
      if (!soundAudio) return;
      await soundAudio.replayAsync();

      if (isFirst) {
        isFirst = false;
        setCurrent(current > meter.numerator ? 1 : current);
      } else {
        setCurrent((prev) => (prev >= meter.numerator ? 1 : prev + 1));
      }
    }, bpmToMs(tempo) / pattern.value);

    setIntervalId(interval);
  }

  return (
    <View style={styles.homeContainer}>
      <FlagWidget current={current} flagCount={meter.numerator} />
      <View
        style={{
          gap: 0,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
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
    </View>
  );
}

export default Home;
