// 定义拍号 (Time Signature)
export interface TimeSignature {
    numerator: number; // 分子
    denominator: number; // 分母
}

// 定义拍子样式 (Beat Style)
export interface BeatStyle {
    value: number;
    iconSource: number; // 图标文件资源
}

// 定义节拍器状态 (Metronome State)
export interface MetronomeState {
    currentBeat: number; // 当前节拍，从 1 开始
    subdivision: number; // 当前节拍的哪一部分，细分为 1, 2, 3, 4 等
    bpm: number; // 每分钟的拍数 (Beats Per Minute)
    timeSignature: TimeSignature; // 拍号
    beatStyle: BeatStyle; // 拍子样式
}

export type MetronomeAction =
    | { type: "UPDATE_CURRENT_BEAT"; payload: { beat: number; subdivision: number } }
    | { type: "UPDATE_BPM"; payload: { bpm: number } }
    | { type: "UPDATE_TIME_SIGNATURE"; payload: { numerator: number; denominator: number } }
    | { type: "UPDATE_BEAT_STYLE"; payload: { value: number; iconSource: number } }
    | { type: "RESET" };
