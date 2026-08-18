import type { Note } from "../types/create";
import type { Measure } from "../types/create"

interface MeasureProps{
    strings:number;
    notes:Note[];
}


function MeasureComponent({strings,notes}:MeasureProps) {
    const ary = Array.from({length:strings})
    return(
        <>
            {/* 基準線 */}
            <div className="measure-wrapper">
                {ary.map((string,index)=>{
                    return <div key={`string_${index}`}></div>
                })}
            </div>
            {notes.map((notes,index)=>{
                // ここに音符描画コンポーネント
                return <div></div>
            })}
        </>
    )
}
export default MeasureComponent