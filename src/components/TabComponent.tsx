import { useState } from "react";
import type { Note } from "../types/create"
import type { Tab } from "../types/create";
import { mockTab } from "../mock/create";
import MeasureComponent from "./MeasureComponent";
import { Box } from "@mui/material";
interface TabProps{
    strings:number;
}

function TabComponent({strings}:TabProps) {
    const [score,setScore] = useState<Tab>(mockTab);
    const updateNotes = (measureIndex:number,addedNotes:Note[]) => {
        setScore((prevScore)=>{
            return {
                ...prevScore,
                measures:prevScore.measures.map((measure,idx)=>{
                    return idx === measureIndex
                    ? {...measure,notes:addedNotes} : measure
                }),

            }
        })
    }
    return(
        <Box sx={{overflowY:'scroll',width:'100%',flex:'1',padding:'2%',boxSizing:'border-box',border:'1px solid black',}}>
            {score.measures.map((measure,index)=>{
                return <MeasureComponent
                    key={`measure_${index}`}
                    strings={strings}
                    notes={measure.notes}
                    measureIndex={index}
                    updateNotes={updateNotes}
                />
            })}
        </Box>

    )
}
export default TabComponent