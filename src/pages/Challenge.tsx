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
            <Box sx={{display:"flex",flexDirection:"column",justifyContent:"start",alignItems:"center",height:"100%"}}>
                <Box sx={{display: "flex",alignItems: "center",justifyContent: "center",gap:4,pb:2,my:3,borderBottom:"1px solid black",width:"100%",height:"20%",boxSizing:"border-box"}}>
                    <Button component={Link} to="/" variant="outlined">ホームに戻る</Button>
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
                    {visiblePosts.map((post)=>{
                        return <TabPostCard
                            tabPost={post}
                            key={post.id}
                        />
                    })}
                    {isLoading && <Typography color="text.secondary">譜面を読み込んでいます…</Typography>}
                    {!isLoading && visiblePosts.length === 0 && (
                        <Typography color="text.secondary">該当する譜面はありません。</Typography>
                    )}
                </Box>
            </Box>
        </>
    )
}
export default Challenge
