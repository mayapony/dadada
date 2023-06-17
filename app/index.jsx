import { Audio } from "expo-av";
import { Stack } from "expo-router";
import { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react/cjs/react.development";
import BpmChanger from "../components/BpmChanger";
import Flag from "../components/Flag";
import { DARK_THEME } from "../constants/theme";
import { styles } from "../styles/home.style";
import { bpmToMs } from "../utils";

const soundFile = require("../assets/metronome.mp3");

export default function Home() {
  const [current, setCurrent] = useState(1);
  const [intervalId, setIntervalId] = useState(null);
  const [bpm, setBpm] = useState(60);
  const [isStarted, setIsStarted] = useState(false);
  const soundRef = useRef(null);

  function handleUpdateBpm(increment) {
    setBpm((b) => b + increment);
  }

  useEffect(() => {
    if (isStarted) {
      clearInterval(intervalId);
      const interval = setInterval(async () => {
        playSound();
        setCurrent((prev) => {
          if (prev === 4) {
            return 1;
          } else {
            return (prev += 1);
          }
        });
      }, bpmToMs(bpm));

      setIntervalId(interval);
    }
  }, [bpm]);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    soundRef.current = sound;
    await sound.playAsync();
  }

  async function handleStartPress() {
    console.log(isStarted);
    // if started then stop
    if (isStarted) {
      console.log("Unloading Sound");
      if (soundRef.current) soundRef.current.unloadAsync();
      clearInterval(intervalId);
      setIntervalId(null);
      setCurrent(1);
    } else {
      // else then start
      startInterval();
    }

    setIsStarted((is) => !is);
  }

  async function startInterval() {
    // soundRef.current = sound;
    // await sound.playAsync();
    playSound();
    const interval = setInterval(async () => {
      playSound();
      setCurrent((prev) => {
        if (prev === 4) {
          return 1;
        } else {
          return (prev += 1);
        }
      });
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
              {!!isStarted ? "暂 停" : "开 始"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
