import highSoundFile from "assets/sounds/metronome.mp3";
import midSoundFile from "assets/sounds/metronome1.mp3";
import lowSoundFile from "assets/sounds/metronome2.mp3";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";

type SoundAudioType = {
  high: Sound | null;
  mid: Sound | null;
  low: Sound | null;
};

export const soundAudios: SoundAudioType = {
  high: null,
  mid: null,
  low: null,
};

export async function prepareSounds() {
  try {
    const { sound: highSound } = await Audio.Sound.createAsync(highSoundFile);
    const { sound: midSound } = await Audio.Sound.createAsync(midSoundFile);
    const { sound: lowSound } = await Audio.Sound.createAsync(lowSoundFile);
    soundAudios.high = highSound;
    soundAudios.mid = midSound;
    soundAudios.low = lowSound;
    console.log("sound loaded");
  } catch (e) {
    console.log("File to load sound", e);
  }
}

export async function unloadSounds() {
  console.log("unloading");
  await soundAudios.high?.unloadAsync();
  await soundAudios.mid?.unloadAsync();
  await soundAudios.low?.unloadAsync();
}
