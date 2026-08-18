import { TextField } from "@mui/material";
import { Typography } from "@mui/material"
import { Box } from "@mui/material";

import type { TabPost } from "../types/challenge"
import TabPostCard from "../components/TabPostCard";
import { useState } from "react";

interface ChallengeProps {
  allPost: TabPost[];
}
function Challenge({allPost}: ChallengeProps) {
    const [search,setSearch] = useState<string>("")
    return(
        <>
            <Box sx={{display:"flex",flexDirection:"column",justifyContent:"start",alignItems:"center",height:"100%"}}>
                <Box sx={{display: "flex",alignItems: "center",justifyContent: "center",gap:4,pb:2,my:3,borderBottom:"1px solid black",width:"100%",height:"20%",boxSizing:"border-box"}}>
                    <Typography color="text.primary" variant="h5">
                        譜面に挑戦
                    </Typography>
                    <TextField
                        label="譜面を検索"
                        variant="outlined"
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        sx={{width:"40%"}}
                    />
                </Box>
                <Box sx={{overflowY:"scroll",display:"grid",pt:3,
                gridTemplateColumns: {xs: "1fr",sm: "repeat(2, 1fr)",md: "repeat(3, 1fr)",},gap:2,flexGrow:1,width:"80%",flexShrink:0}}>
                    {allPost.map((post)=>{
                        return <TabPostCard
                            tabPost={post}
                            key={post.id}
                        />
                    })}
                </Box>
            </Box>
        </>
    )
}
export default Challenge