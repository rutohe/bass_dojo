import { useRef, type PointerEvent } from "react";
import type { Note } from "../types/create"
import type { Part } from "../types/parts";
import { isTupletPart, tupletSubdivision } from "../types/parts";
import styles from "./NoteComponent.module.css"
import { clickNote } from "../functions/clickNote";
import { resizeNote } from "../functions/resizeNote";


interface NoteProps{
    note:Note,
    strings:number,
    part:Part | '',
    notes:Note[],
    cellWidth:number,
    gridDivisions:number,
    noteClick:(note:Note|null,targetId:string) => void,
    resize:(note:Note) => void,
}

function NoteComponent({note,strings,part,notes,cellWidth,gridDivisions,noteClick,resize}:NoteProps) {
    const resizeStart = useRef<{ x: number; length: number } | null>(null);

    const style = {
        left:`${note.start*100/gridDivisions}%`,
        top:`${note.string/strings*100}%`,
        width:`${note.length/gridDivisions*100}%`,
    }
    const displayedSubdivision = note.subdivision ?? 1;

    const maximumLength = () => {
        const nextNote = notes
            .filter((item) => item.id !== note.id && item.string === note.string && item.start > note.start)
            .reduce<number | null>((closestStart, item) => (
                closestStart === null || item.start < closestStart ? item.start : closestStart
            ), null);

        return nextNote === null ? gridDivisions - note.start : nextNote - note.start;
    };

    const startResize = (event: PointerEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        resizeStart.current = { x: event.clientX, length: note.length };
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const moveResize = (event: PointerEvent<HTMLDivElement>) => {
        if (resizeStart.current === null) return;

        const length = resizeNote(
            resizeStart.current.length,
            event.clientX - resizeStart.current.x,
            cellWidth,
            maximumLength(),
        );
        if (length !== note.length) resize({ ...note, length });
    };

    const finishResize = (event: PointerEvent<HTMLDivElement>) => {
        resizeStart.current = null;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    };
    return(
        <div 
            className={styles.note}
            style={style}
            onClick={()=>{
                if (isTupletPart(part)) {
                    const subdivision = tupletSubdivision(part);
                    noteClick(
                        { ...note, subdivision: note.subdivision === subdivision ? 1 : subdivision },
                        note.id,
                    );
                    return;
                }
                noteClick(clickNote(part,note),note.id);
            }}
        >
            <span className={styles.fret}>{note.fret}</span>
            {displayedSubdivision > 1 && (
                <span className={styles.subdivisionLabel} aria-label={`${displayedSubdivision}連符`}>
                    {displayedSubdivision}
                </span>
            )}
            {/* ここにドラッグ判定用の要素入れて頑張る */}
            <div
                className={styles.hitbox}
                onPointerDown={startResize}
                onPointerMove={moveResize}
                onPointerUp={finishResize}
                onPointerCancel={finishResize}
                onClick={(event) => event.stopPropagation()}
            ></div>
        </div>
    )
}
export default NoteComponent
