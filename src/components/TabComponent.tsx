import type { Note } from "../types/create"
import type { Tab } from "../types/create";
import type { Part } from "../types/parts";
import MeasureComponent from "./MeasureComponent";
import { Box } from "@mui/material";
import { DEFAULT_TIME_SIGNATURE, getGridDivisions } from "../types/rhythm";
interface TabProps{
    strings:number,
    part:Part | '',
    score:Tab,
    setScore:React.Dispatch<React.SetStateAction<Tab>>,
    activeGrid:number | null,
}

function TabComponent({strings,part,score,setScore,activeGrid}:TabProps) {
    const timeSignature = score.timeSignature ?? DEFAULT_TIME_SIGNATURE;
    const updateNotes = (measureIndex:number,addedNotes:Note[]) => {
        setScore((prevScore)=>{
            const isLastMeasure = measureIndex === prevScore.measures.length - 1;
            const hasNotes = addedNotes.length > 0;
            const measures = prevScore.measures.map((measure,idx)=>{
                return idx === measureIndex
                ? {...measure,notes:addedNotes} : measure
            });

            return {
                ...prevScore,
                // 末尾小節にノーツが置かれたら、次に入力できる空小節を用意する。
                measures: isLastMeasure && hasNotes
                    ? [...measures, { notes: [] }]
                    : measures,
            }
        })
    }
    return(
        <Box role="region" aria-label="譜面編集（横スクロール可能）" tabIndex={0} sx={{overflow:'auto',width:'100%',maxHeight:{xs:'50dvh',sm:'60dvh'},minHeight:180,flexShrink:0,padding:'2%',boxSizing:'border-box',border:'1px solid #cbd5e1',borderRadius:'10px',backgroundColor:'#f1f5f9'}}>
            <Box sx={{
                display:'grid',
                minWidth:getGridDivisions(timeSignature)*44,
                gridTemplateColumns:{xs:'1fr',md:'repeat(2, minmax(0, 1fr))',lg:'repeat(3, minmax(0, 1fr))'},
                rowGap: "16px", columnGap: 0,
            }}>
                {score.measures.map((measure,index)=>{
                    return <MeasureComponent
                        key={`measure_${index}`}
                        strings={strings}
                        notes={measure.notes}
                        measureIndex={index}
                        updateNotes={updateNotes}
                        part={part}
                        timeSignature={timeSignature}
                        activeGrid={activeGrid}
                    />
                })}
            </Box>
        </Box>

    )
}
export default TabComponent
