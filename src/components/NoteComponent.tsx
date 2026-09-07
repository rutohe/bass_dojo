import type { Note } from "../types/create"
import styles from "./NoteComponent.module.css"
import { GRID_DIVISIONS } from "../types/rhythm";

interface NoteProps{
    note:Note;
    strings:number;
}

function NoteComponent({note,strings}:NoteProps) {
    const style = {
        left:`${note.start*100/GRID_DIVISIONS}%`,
        top:`${note.string/strings*100}%`,
        width:`${note.length/GRID_DIVISIONS*100}%`,
    }
    return(
        <div className={styles.note} style={style}>
            {note.fret}
        </div>
    )
}
export default NoteComponent