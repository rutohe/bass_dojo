import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardActions } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { DEFAULT_TIME_SIGNATURE } from "../types/rhythm";

import type { TabPost } from "../types/challenge"

interface TabPostCardProps{
    tabPost: TabPost;
}

function TabPostCard({tabPost}:TabPostCardProps) {
    const timeSignature = tabPost.score.timeSignature ?? DEFAULT_TIME_SIGNATURE;
    return(
        <Card sx={{border:"1px solid",borderColor:"divider",p:2,minWidth:0,display:"flex",flexDirection:"column",overflowWrap:"anywhere",transition:"transform .5s",
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

                <Typography>
                    拍子: {timeSignature.beats}/{timeSignature.beatUnit}
                </Typography>
            </CardContent>

            <CardActions sx={{mt:"auto",pt:2}}>
                <Button component={Link} to={`/challenge/${tabPost.id}`} variant="contained" sx={{mx:"auto",width:{xs:"100%",sm:"auto"},minHeight:44}}>
                    挑戦する
                </Button>
            </CardActions>
        </Card>
    )
}
export default TabPostCard
