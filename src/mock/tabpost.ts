import type { TabPost } from "../types/challenge";

export const mockTabPosts: TabPost[] = [
  {
    id: "1",
    title: "スラップ基礎①",
    description: "スラップの基本フレーズに挑戦してみよう！",
    difficulty: 2,
    authorName: "Bass Dojo",
    score: {
      measures: [
        {
          notes: [
            {
              start: 0,
              string: 1,
              fret: 3,
              length: 4,
            },
            {
              start: 4,
              string: 1,
              fret: 5,
              length: 4,
            },
          ],
        },
      ],
    },
  },
  {
    id: "2",
    title: "指弾き基礎①",
    description: "まずはゆっくりしたテンポで指弾きを練習しよう。",
    difficulty: 1,
    authorName: "Bass Dojo",
    score: {
      measures: [
        {
          notes: [
            {
              start: 0,
              string: 2,
              fret: 3,
              length: 4,
            },
            {
              start: 4,
              string: 2,
              fret: 5,
              length: 4,
            },
          ],
        },
      ],
    },
  },
  {
    id: "3",
    title: "リズムトレーニング①",
    description: "リズムを意識してフレーズを弾いてみよう。",
    difficulty: 3,
    authorName: "Bass Dojo",
    score: {
      measures: [
        {
          notes: [
            {
              start: 0,
              string: 1,
              fret: 5,
              length: 2,
            },
            {
              start: 2,
              string: 1,
              fret: 5,
              length: 2,
            },
          ],
        },
      ],
    },
  },
];