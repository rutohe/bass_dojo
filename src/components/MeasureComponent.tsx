import type { Note } from "../types/create";
import type { Measure } from "../types/create"
import NoteComponent from "./NoteComponent";
import { GRID_DIVISIONS } from "../types/rhythm";
import styles from "./MeasureComponent.module.css";

interface MeasureProps{
    strings:number;
    notes:Note[];
}


function MeasureComponent({strings,notes}:MeasureProps) {
    const ary = Array.from({length:strings})
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
                                onClick={()=>{console.log(idx)}}
                                key={`string_${idx}`}
                            >

                            </div>
                        })}
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