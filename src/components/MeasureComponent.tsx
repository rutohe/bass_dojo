import type { Note } from "../types/create";
import type { Part } from "../types/parts";
import { isTupletPart } from "../types/parts";
import type { TimeSignature } from "../types/rhythm";
import NoteComponent from "./NoteComponent";
import { addNote } from "../functions/addNote";
import { getGridDivisions, getGridsPerBeat } from "../types/rhythm";
import styles from "./MeasureComponent.module.css";
import { useState,useEffect,useRef } from "react";

interface MeasureProps{
    strings:number;
    notes:Note[];
    measureIndex:number,
    updateNotes:(measureIndex:number,addedNotes:Note[]) => void,
    part:Part | '',
    timeSignature:TimeSignature,
    activeGrid:number | null,
}


function MeasureComponent({strings,notes,measureIndex,updateNotes,part,timeSignature,activeGrid}:MeasureProps) {
    const [cellWidth, setCellWidth] = useState<number>(0);
    const measureRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!measureRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const totalWidth = entry.contentRect.width;
                setCellWidth(totalWidth / getGridDivisions(timeSignature));
            }
        });

        observer.observe(measureRef.current);

        return () => observer.disconnect();
    }, [timeSignature]);

    const ary = Array.from({length:strings});
    const gridDivisions = getGridDivisions(timeSignature);
    const gridsPerBeat = getGridsPerBeat(timeSignature);
    const cellClick = (column: number, string: number,fret:string) => {
        // 連符は既存ノーツをクリックして設定するため、空セルには配置しない。
        if (isTupletPart(fret)) return;
        const newNote: Note = {
            id: crypto.randomUUID(), // 一意なID
            start: column,
            string: string,
            fret: fret, // 選択中のフレット番号
            length: 1, // 初期長さ（16分音符）
        };
        updateNotes(measureIndex,addNote(newNote,notes));
    }
    const noteClick = (note:Note|null,targetId:string) => {
        if(note === null){
            const newNotes = notes.filter((item)=>item.id!==targetId);
            updateNotes(measureIndex,newNotes);
            return;
        }
        const newNotes = notes.map((item)=>{
            return (item.id === targetId) ? note : item;
        })
        updateNotes(measureIndex,newNotes);
    }
    const resizeNote = (resizedNote: Note) => {
        updateNotes(measureIndex, notes.map((note) => (
            note.id === resizedNote.id ? resizedNote : note
        )));
    }
    return(
        <>
            {/* 基準線 */}
            <div className={styles.measureWrapper} ref={measureRef}>
                {Array.from({length:gridDivisions}).map((_,index)=>{
                    return <div 
                                className={`${styles.measureColumn} ${index % gridsPerBeat === 0 ? styles.beatColumn : ""} ${Math.floor(activeGrid ?? -1) === measureIndex * gridDivisions + index ? styles.activeColumn : ""}`}
                                key={`column_${index}`}
                            >
                                {ary.map((_,idx)=>{
                                    return <div 
                                    // fret0固定,後で編集のstateと共通させる
                                        onClick={()=>{cellClick(index,idx,part)}}
                                        key={`string_${idx}`}
                                    ></div>})}
                            </div>
                })}
                {notes.map((note)=>{
                    // ここに音符描画コンポーネント
                    return <NoteComponent
                        key={note.id}
                        strings={strings}
                        note={note}
                        part={part}
                        gridDivisions={gridDivisions}
                        notes={notes}
                        cellWidth={cellWidth}
                        noteClick={noteClick}
                        resize={resizeNote}
                    />
                })}
            </div>
        </>
    )
}
export default MeasureComponent
