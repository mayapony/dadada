import highSoundFile from "assets/sounds/high.mp3";
import lowSoundFile from "assets/sounds/low.mp3";
import midSoundFile from "assets/sounds/mid.mp3";
import { AVPlaybackStatusSuccess, Audio } from "expo-av";
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

export async function setSoundsRate(intervalTime: number) {
  if (!isAudioLoaded()) return;

  const midStatus =
    (await soundAudios.mid?.getStatusAsync()) as AVPlaybackStatusSuccess;
  const lowStatus =
    (await soundAudios.low?.getStatusAsync()) as AVPlaybackStatusSuccess;
  const midRate = (midStatus.durationMillis ?? intervalTime) / intervalTime;
  const lowRate = (lowStatus.durationMillis ?? intervalTime) / intervalTime;

  await soundAudios.mid?.setRateAsync(midRate, true);
  await soundAudios.low?.setRateAsync(lowRate, true);
}

export function unloadSounds() {
  console.log("unloading");
  Object.values(soundAudios).forEach((s) => {
    if (s) s.unloadAsync();
  });
}

export async function playMidSound() {
  soundAudios.low?.stopAsync();

  await soundAudios.mid?.playAsync();
  soundAudios.mid?.setPositionAsync(0);
}

export async function playLowSound() {
  soundAudios.mid?.stopAsync();

  await soundAudios.low?.playAsync();
  soundAudios.low?.setPositionAsync(0);
}

function isAudioLoaded(): boolean {
  Object.values(soundAudios).forEach((s) => {
    if (!s) {
      console.log("audio not loaded");
      return false;
    }
  });
  return true;
}
