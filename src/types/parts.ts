// 4弦／5弦ベースで一般的な、24フレットまでを入力できるようにする。
export const parts = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "x",
  "2連",
  "3連",
] as const;

// 編集パネルで選択できる値。
export type Part = (typeof parts)[number];

export type TupletPart = "2連" | "3連";

export const isTupletPart = (part: string): part is TupletPart => (
  part === "2連" || part === "3連"
);

export const tupletSubdivision = (part: TupletPart) => (
  part === "2連" ? 2 : 3
);
