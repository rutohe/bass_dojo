// 1小節の分割数
export interface TimeSignature {
  beats: number;
  beatUnit: 4 | 8;
}

export const TIME_SIGNATURES: TimeSignature[] = [
  { beats: 2, beatUnit: 4 },
  { beats: 3, beatUnit: 4 },
  { beats: 4, beatUnit: 4 },
  { beats: 5, beatUnit: 4 },
  { beats: 6, beatUnit: 8 },
];

export const DEFAULT_TIME_SIGNATURE: TimeSignature = { beats: 4, beatUnit: 4 };

// 最小単位を16分音符として、小節内の入力グリッド数を求める。
export const getGridDivisions = ({ beats, beatUnit }: TimeSignature) => (
  beats * 16 / beatUnit
);

export const getGridsPerBeat = ({ beatUnit }: TimeSignature) => 16 / beatUnit;

// 4/4との後方互換用の既定値。
export const GRID_DIVISIONS = getGridDivisions(DEFAULT_TIME_SIGNATURE);
