import type { Note } from "../types/create"
export const clickNote = (nextFret:number,targetNote:Note) => {
    // 同じフレット数でかぶせてクリックしたら削除
    if(targetNote.fret === nextFret) return null;
    else return {...targetNote,fret:nextFret}
}