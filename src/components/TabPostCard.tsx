import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardActions } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";

import type { TabPost } from "../types/challenge"

interface TabPostCardProps{
    tabPost: TabPost;
}

function TabPostCard({tabPost}:TabPostCardProps) {
    return(
        <Card sx={{border:"1px solid",borderColor:"divider",p:2,mb:2,height:"45%",transition:"transform .5s",
            "&:hover":{backgroundColor: "action.hover",transform: "translateY(-4px)",boxShadow: 4,}}}>
            <CardContent sx={{p:0}}>
                <Typography>
                    {tabPost.title}
                </Typography>

                <Typography>
                    難易度：
                    <Rating
                        value={tabPost.difficulty}
                        max={5}
                        readOnly
                    />
                </Typography>

                <Typography>
                    投稿者：{tabPost.authorName}
                </Typography>

                {/* 可能ならTABプレビュー */}

            </CardContent>

            <CardActions>
                <Button variant="contained" sx={{mx:"auto"}}>
                    挑戦する
                </Button>
            </CardActions>
        </Card>
    )
}
export default TabPostCard