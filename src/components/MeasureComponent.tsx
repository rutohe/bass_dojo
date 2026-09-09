import type { Note } from "../types/create";
import type { Measure } from "../types/create"
import NoteComponent from "./NoteComponent";
import { addNote } from "../functions/addNote";
import { GRID_DIVISIONS } from "../types/rhythm";
import styles from "./MeasureComponent.module.css";

interface MeasureProps{
    strings:number;
    notes:Note[];
    measureIndex:number,
    updateNotes:(measureIndex:number,addedNotes:Note[]) => void,
}


function MeasureComponent({strings,notes,measureIndex,updateNotes}:MeasureProps) {
    const ary = Array.from({length:strings});
    const cellClick = (column: number, string: number,fret:number) => {
        const newNote: Note = {
            id: crypto.randomUUID(), // 一意なID
            start: column,
            string: string,
            fret: fret, // 選択中のフレット番号
            length: 1, // 初期長さ（16分音符）
        };
        updateNotes(measureIndex,addNote(newNote,notes));
    }
    return(
        <>
            {/* 基準線 */}
            <div className={styles.measureWrapper}>
                {Array.from({length:GRID_DIVISIONS}).map((item,index)=>{
                    return <div 
                                className={styles.measureColumn} 
                                key={`column_${index}`}
                            >
                                {ary.map((string,idx)=>{
                                    return <div 
                                    // fret0固定,後で編集のstateと共通させる
                                        onClick={()=>{cellClick(index,idx,0)}}
                                        key={`string_${idx}`}
                                    ></div>})}
                            </div>
                })}
                {notes.map((note,index)=>{
                    // ここに音符描画コンポーネント
                    return <NoteComponent
                        key={note.id}
                        strings={strings}
                        note={note}
                    />
                })}
            </div>
        </>
    )
}
export default MeasureComponent