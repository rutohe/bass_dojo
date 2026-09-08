import { useState } from "react";
import type { Measure } from "../types/create"
import MeasureComponent from "./MeasureComponent";
import { Box } from "@mui/material";
interface TabProps{
    measures:Measure[];
    strings:number;
}

function TabComponent({measures,strings}:TabProps) {
    console.log("measures:", measures);
    return(
        <Box sx={{overflowY:'scroll',width:'100%',flex:'1',padding:'2%',boxSizing:'border-box',border:'1px solid black',}}>
            {measures.map((measure,index)=>{
                return <MeasureComponent
                    key={`measure_${index}`}
                    strings={strings}
                    notes={measure.notes}
                />
            })}
        </Box>

    )
}
export default TabComponent