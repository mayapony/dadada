import soundFile from "assets/sounds/metronome.mp3";
import FlagWidget from "components/FlagWidget";
import MeterWidget from "components/MeterWidget";
import PatternWidget from "components/PatternWidget";
import TempoWidget from "components/TempoWidget";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "styles/home.style";
import { Meter } from "types/meter.interface";
import { bpmToMs } from "utils/index";

let soundAudio: null | Sound;

async function prepareSounds() {
  try {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    soundAudio = sound;
    console.log("sound loaded");
  } catch (e) {
    console.log("File to load sound", e);
  }
}

async function unloadSounds() {
  console.log("unloading");
  if (soundAudio) await soundAudio.unloadAsync();
}

function Home() {
  const [current, setCurrent] = useState(1);
  const [intervalId, setIntervalId] = useState<null | number>(null);
  const [bpm, setBpm] = useState(60);
  const [isStarted, setIsStarted] = useState(false);
  const [meter, setMeter] = useState<Meter>({
    numerator: 4,
    denominator: 4,
  });

  function handleUpdateBpm(increment: number) {
    setBpm((b) => b + increment);
    if (isStarted) updateInterval(meter);
  }

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
      startInterval();
    }

    setIsStarted((is) => !is);
  }

  async function startInterval() {
    let isLoaded = false;
    let isFirst = true;
    prepareSounds().then(() => {
      isLoaded = true;
    });
    const interval = setInterval(async () => {
      if (!isLoaded || !soundAudio) return;
      // fix: use replay replace playAsync
      soundAudio.replayAsync();

      if (isFirst) {
        isFirst = false;
        setCurrent(1);
      } else setCurrent((prev) => (prev === meter.numerator ? 1 : prev + 1));
    }, bpmToMs(bpm));

    setIntervalId(interval);
  }

  function updateInterval(curMeter: Meter) {
    // console.log(curMeter);
    if (intervalId) clearInterval(intervalId);
    setIntervalId(null);

    const interval = setInterval(async () => {
      if (!soundAudio) return;
      await soundAudio.replayAsync();
      setCurrent((prev) => (prev >= curMeter.numerator ? 1 : prev + 1));
    }, bpmToMs(bpm));

    setIntervalId(interval);
  }

  function handleUpdateMeter(meter: Meter) {
    updateInterval(meter);
    setMeter(meter);
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
        <MeterWidget handleUpdateMeter={handleUpdateMeter} meter={meter} />

        <PatternWidget />

        <TempoWidget handleUpdateBpm={handleUpdateBpm} bpm={bpm} />

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
