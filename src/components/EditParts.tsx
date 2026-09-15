import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { isTupletPart, parts } from "../types/parts";
import type { Part } from "../types/parts";

interface Props {
  part: Part | '',
  setPart: React.Dispatch<React.SetStateAction<Part | ''>>,
}

function EditParts({part,setPart}:Props) {
    return(
        <Box sx={{
            width:'100%',
            border:'1px solid #cbd5e1',
            borderRadius:'10px',
            backgroundColor:'#f8fafc',
            boxShadow:'0 1px 3px rgba(15, 23, 42, 0.08)',
            padding:'12px',
            boxSizing:'border-box',
        }}>
            <p>選択中のパーツ：{(part) ? part : 'なし(消しゴム)'}</p>
            <Box sx={{
                    display: "grid",
                    gridTemplateColumns:'repeat(auto-fill, minmax(48px, 1fr))',
                    gap:'8px',
                    
            }}>
                {parts.map((item)=>{
                    return <Button
                        onClick={()=>{setPart((prevPart)=>((prevPart === item) ? '' : item))}}
                        sx={{
                            minWidth: 0,
                            height: '42px',
                            border: '1px solid',
                            borderColor: part === item ? '#1d4ed8' : (isTupletPart(item) ? '#a78bfa' : '#cbd5e1'),
                            backgroundColor: part === item ? '#2563eb' : (isTupletPart(item) ? '#f5f3ff' : 'white'),
                            color: part === item ? 'white' : 'inherit',
                            fontWeight: isTupletPart(item) ? 700 : 600,
                            '&:hover': {
                                backgroundColor: part === item ? '#1d4ed8' : (isTupletPart(item) ? '#ede9fe' : '#eff6ff'),
                            },
                        }}
                    >
                        {item}
                    </Button>
                })}
            </Box>
        </Box>
    )    
}

export default EditParts
