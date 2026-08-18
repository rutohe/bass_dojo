import type { Measure } from "../types/create"
import MeasureComponent from "./MeasureComponent";
import { Box } from "@mui/material";
interface TabProps{
    measures:Measure[];
}

function Tab({measures}:TabProps) {
    return(
        <Box>
            {measures.map((measure,index)=>{
                return <MeasureComponent
                    measure={measure}
                />
            })}
        </Box>
    )
}
export default Tab