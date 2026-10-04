import { TextField } from "@mui/material";
import { Typography } from "@mui/material"
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import type { TabPost } from "../types/challenge"
import TabPostCard from "../components/TabPostCard";
import { useState } from "react";

interface ChallengeProps {
  allPost: TabPost[];
  isLoading: boolean;
}
function Challenge({allPost,isLoading}: ChallengeProps) {
    const [search,setSearch] = useState<string>("")
    const normalizedSearch = search.trim().normalize("NFKC").toLowerCase();
    const filteredPosts = allPost.filter((post) => (
        post.title.normalize("NFKC").toLowerCase().includes(normalizedSearch)
    ));
    const visiblePosts = isLoading ? [] : filteredPosts;
    return(
        <>
            <Box sx={{display:"flex",flexDirection:"column",justifyContent:"start",alignItems:"center",minHeight:"100%",px:{xs:2,sm:3},pb:3}}>
                <Box sx={{display: "flex",alignItems: "center",justifyContent: "center",gap:{xs:2,sm:3},flexWrap:"wrap",pb:2,my:3,borderBottom:"1px solid",borderColor:"divider",width:"100%",maxWidth:1200,boxSizing:"border-box"}}>
                    <Button component={Link} to="/" variant="outlined">ホームに戻る</Button>
                    <Typography color="text.primary" variant="h5" component="h1" sx={{fontSize:{xs:"1.35rem",sm:"1.5rem"}}}>
                        譜面に挑戦
                    </Typography>
                    <TextField
                        label="譜面を検索"
                        variant="outlined"
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        sx={{width:{xs:"100%",sm:"40%"},minWidth:0}}
                    />
                </Box>
                <Box sx={{display:"grid",alignItems:"stretch",pt:1,
                gridTemplateColumns: {xs: "minmax(0, 1fr)",sm: "repeat(2, minmax(0, 1fr))",md: "repeat(3, minmax(0, 1fr))",},gap:2,width:"100%",maxWidth:1200}}>
                    {visiblePosts.map((post)=>{
                        return <TabPostCard
                            tabPost={post}
                            key={post.id}
                        />
                    })}
                    {isLoading && <Typography color="text.secondary" sx={{gridColumn:"1 / -1"}} role="status">譜面を読み込んでいます…</Typography>}
                    {!isLoading && visiblePosts.length === 0 && (
                        <Typography color="text.secondary" sx={{gridColumn:"1 / -1"}} role="status">該当する譜面はありません。</Typography>
                    )}
                </Box>
            </Box>
        </>
    )
}
export default Challenge
