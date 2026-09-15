import { Box, Button, Container, Rating, Typography } from "@mui/material";
import { Link, Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import type { TabPost } from "../types/challenge";
import ScoreViewer from "../components/ScoreViewer";
import RhythmPlayer from "../components/RhythmPlayer";
import { DEFAULT_TIME_SIGNATURE } from "../types/rhythm";

interface ChallengeDetailProps {
  allPost: TabPost[];
  isLoading: boolean;
}

function ChallengeDetail({ allPost, isLoading }: ChallengeDetailProps) {
  const [activeGrid, setActiveGrid] = useState<number | null>(null);
  const { postId } = useParams();
  const post = allPost.find((item) => item.id === postId);
  const timeSignature = post?.score.timeSignature ?? DEFAULT_TIME_SIGNATURE;

  if (isLoading) return <Container sx={{ py: 3 }}>譜面を読み込んでいます…</Container>;
  if (post === undefined) return <Navigate to="/challenge" replace />;

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Button component={Link} to="/" variant="outlined">
        ホームに戻る
      </Button>
      <Box sx={{ mt: 3, mb: 2 }}>
        <Typography variant="h4" component="h1">{post.title}</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>{post.description}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
          <Typography>難易度</Typography>
          <Rating value={post.difficulty} max={5} readOnly />
          <Typography color="text.secondary">{post.difficulty}/5</Typography>
        </Box>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          拍子: {timeSignature.beats}/{timeSignature.beatUnit}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          投稿者：{post.authorName}
        </Typography>
      </Box>
      <RhythmPlayer score={post.score} onActiveGridChange={setActiveGrid} />
      <ScoreViewer score={post.score} activeGrid={activeGrid} />
    </Container>
  );
}

export default ChallengeDetail;
