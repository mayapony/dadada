import soundFile from "assets/metronome.mp3";
import BpmChanger from "components/BpmChanger";
import Flag from "components/Flag";
import { DARK_THEME } from "constants/theme";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { Stack } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "styles/home.style";
import { bpmToMs } from "utils";

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

  function handleUpdateBpm(increment: number) {
    setBpm((b) => b + increment);
    if (isStarted) updateInterval();
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
      } else setCurrent((prev) => (prev === 4 ? 1 : prev + 1));
    }, bpmToMs(bpm));

    setIntervalId(interval);
  }

  function updateInterval() {
    if (intervalId) clearInterval(intervalId);
    setIntervalId(null);

    const interval = setInterval(async () => {
      if (!soundAudio) return;
      await soundAudio.replayAsync();
      setCurrent((prev) => (prev === 4 ? 1 : prev + 1));
    }, bpmToMs(bpm));

    setIntervalId(interval);
  }

  return (
    <SafeAreaView style={styles.homeArea}>
      <Stack.Screen
        options={{
          headerTitle: "DADADA 🌸",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTintColor: DARK_THEME.text,
          headerStyle: {
            backgroundColor: DARK_THEME.base,
          },
        }}
      />
      <View style={styles.homeContainer}>
        <Flag current={current} />
        <View
          style={{ gap: 30, justifyContent: "center", alignItems: "center" }}
        >
          <BpmChanger handleUpdateBpm={handleUpdateBpm} bpm={bpm} />
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
    </SafeAreaView>
  );
}

export default Home;
