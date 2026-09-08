import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { parts } from "../types/parts";

interface Props {
  part: string;
  setPart: React.Dispatch<React.SetStateAction<string>>;
}

function EditParts({part,setPart}:Props) {
    return(
        <Box sx={{width:'100%',height:'25%',border:'1px solid black',}}>
            <p>選択中のパーツ：{(part) ? part : 'なし'}</p>
            <Box sx={{
                    display: "flex",
                    flexDirection:'row',
                    justifyContent:'space-around',
                    alignItems:'center',
                    gap:'5px',
                    
            }}>
                {parts.map((item)=>{
                    return <Button
                        onClick={()=>{setPart(item)}}
                        sx={{
                            width: '50px',
                            height: '50px',
                            border: '1px solid black',
                            backgroundColor: part === item ? 'primary.main' : 'transparent',
                            color: part === item ? 'white' : 'inherit',
                            '&:hover': {
                                backgroundColor: part === item ? 'primary.dark' : undefined,
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