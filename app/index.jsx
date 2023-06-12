import { Audio } from "expo-av";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BpmChanger from "../components/bpm-changer/BpmChanger";
import { DARK_THEME } from "../constants/theme";
import { bpmToMs } from "../utils";

export default function Home() {
  const [current, setCurrent] = useState(1);
  const [intervalId, setIntervalId] = useState(null);
  const [sound, setSound] = useState();
  const soundFile = require("../assets/metronome.mp3");
  const [bpm, setBpm] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);

  function handleUpdateBpm(increment) {
    setBpm((b) => b + increment);
    clearInterval(intervalId);
    setIntervalId(null);
    startInterval();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(soundFile);
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  async function handleStartPress() {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setCurrent(1);
      return;
    }

    startInterval();
  }

  async function startInterval() {
    await playSound();
    const interval = setInterval(async () => {
      await playSound();
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
        <View style={styles.iconsContainer}>
          {[1, 2, 3, 4].map((number) => {
            return (
              <View
                style={current === number ? styles.activeIcon : styles.icon}
                id={`block-${number}`}
                key={number}
              >
                <Text
                  style={
                    current === number ? styles.activeIconText : styles.iconText
                  }
                >
                  {number}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={{ gap: 30 }}>
          <BpmChanger handleUpdateBpm={handleUpdateBpm} bpm={bpm} />

          <TouchableOpacity
            style={styles.switchButton}
            onPressIn={handleStartPress}
          >
            <Text style={styles.switchButtonText}>
              {!!intervalId ? "暂 停" : "开 始"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeArea: {
    flex: 1,
    backgroundColor: DARK_THEME.base,
    height: "100%",
  },
  homeContainer: {
    flexDirection: "column",
    paddingLeft: 10,
    paddingRight: 10,
    height: "100%",
    justifyContent: "space-between",
  },
  iconsContainer: {
    backgroundColor: DARK_THEME.surface0,
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-evenly",
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 10,
  },
  icon: {
    borderRadius: "50%",
    backgroundColor: DARK_THEME.overlay0,
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.18,
    height: Dimensions.get("window").width * 0.18,
    justifyContent: "center",
    alignItems: "center",
  },
  activeIcon: {
    borderRadius: "50%",
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.18,
    height: Dimensions.get("window").width * 0.18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: DARK_THEME.pink,
  },
  iconText: {
    fontSize: 30,
    fontWeight: "bold",
    color: DARK_THEME.text,
  },
  activeIconText: {
    fontSize: 30,
    fontWeight: "bold",
    color: DARK_THEME.base,
  },
  switchButton: {
    width: "90%",
    paddingTop: 20,
    paddingBottom: 20,
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: DARK_THEME.surface0,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  switchButtonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: DARK_THEME.pink,
  },
});
