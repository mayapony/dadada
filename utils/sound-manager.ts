import lowSoundFile from "assets/sounds/8bit/low2.wav";
import midSoundFile from "assets/sounds/8bit/mid2.wav";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";

type SoundAudioType = {
  mid: Sound | null;
  low: Sound | null;
};

export const soundAudios: SoundAudioType = {
  mid: null,
  low: null,
};

export async function prepareSounds() {
  try {
    const { sound: midSound } = await Audio.Sound.createAsync(midSoundFile);
    const { sound: lowSound } = await Audio.Sound.createAsync(lowSoundFile);
    soundAudios.mid = midSound;
    soundAudios.low = lowSound;
    console.log("sound loaded");
  } catch (e) {
    console.log("File to load sound", e);
  }
}

export function unloadSounds() {
  console.log("unloading");
  Object.values(soundAudios).forEach((s) => {
    if (s) s.unloadAsync();
  });
}

export async function playMidSound() {
  soundAudios.low?.stopAsync();

  soundAudios.mid?.playAsync();
  soundAudios.mid?.setPositionAsync(0);
}

export async function playLowSound() {
  soundAudios.mid?.stopAsync();

  soundAudios.low?.playAsync();
  soundAudios.low?.setPositionAsync(0);
}
