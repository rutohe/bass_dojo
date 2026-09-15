import type { Note } from "../types/create"
export const clickNote = (nextFret:string,targetNote:Note) => {
    // 同じフレット数でかぶせてクリックしたら削除    
    if(targetNote.fret === nextFret || nextFret === '') return null;
    else return {...targetNote,fret:nextFret}
}