import type { Tab } from "../types/create";

export const mockTab: Tab = {
  measures: [
    {
      notes: [
        {
          id: "note-1",
          start: 0,
          string: 0,
          fret: 3,
          length: 2,
        },
        {
          id: "note-2",
          start: 2,
          string: 0,
          fret: 5,
          length: 2,
        },
        {
          id: "note-3",
          start: 4,
          string: 1,
          fret: 2,
          length: 2,
        },
        {
          id: "note-4",
          start: 6,
          string: 2,
          fret: 0,
          length: 2,
        },
      ],
    },
    {
      notes: [
        {
          id: "note-5",
          start: 0,
          string: 0,
          fret: 3,
          length: 2,
        },
        {
          id: "note-6",
          start: 2,
          string: 1,
          fret: 5,
          length: 2,
        },
        {
          id: "note-7",
          start: 4,
          string: 0,
          fret: 7,
          length: 4,
        },
      ],
    },
    {
      notes: [
        {
          id: "note-8",
          start: 0,
          string: 2,
          fret: 2,
          length: 2,
        },
        {
          id: "note-9",
          start: 4,
          string: 1,
          fret: 4,
          length: 2,
        },
      ],
    },
  ],
};