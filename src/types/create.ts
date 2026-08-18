export interface Note{
    id:string;
    start: number;
    string: number;
    fret: number;
    length: number;
}

export interface Measure{
    notes: Note[];
}

export interface Tab{
    measures: Measure[];
}