export type NoteSubdivision = 1 | 2 | 3;

export interface Note{
    id:string;
    start: number;
    string: number;
    fret: string | number;
    length: number;
    // 1: 通常、2: 2連、3: 3連。未指定の既存ノーツは通常として扱う。
    subdivision?: NoteSubdivision;
}

export interface Measure{
    notes: Note[];
}

export interface Tab{
    measures: Measure[];
    timeSignature?: TimeSignature;
}
import type { TimeSignature } from "./rhythm";
