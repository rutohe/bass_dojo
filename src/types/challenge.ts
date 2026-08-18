import type { Tab } from "./create";

export interface TabPost{
    id: string;
    title: string;
    description: string;
    difficulty: number;
    authorName: string;
    score: Tab;
}