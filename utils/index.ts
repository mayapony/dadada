export function bpmToMs(bpm: number): number {
  return (60 / bpm) * 1000;
}
