import soundFile from "assets/sounds/metronome.mp3";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";

export let soundAudio: null | Sound;

export async function prepareSounds() {
  try {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    soundAudio = sound;
    console.log("sound loaded");
  } catch (e) {
    console.log("File to load sound", e);
  }
}

export async function unloadSounds() {
  console.log("unloading");
  if (soundAudio) await soundAudio.unloadAsync();
}
