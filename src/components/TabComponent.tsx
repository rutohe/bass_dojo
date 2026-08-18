import type { Measure } from "../types/create"
import MeasureComponent from "./MeasureComponent";
import { Box } from "@mui/material";
interface TabProps{
    measures:Measure[];
    strings:number;
}

function TabComponent({measures,strings}:TabProps) {
    return(
        <Box>
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