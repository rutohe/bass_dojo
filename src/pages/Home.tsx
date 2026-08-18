import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";

import { mockTabPosts } from "../mock/tabpost";

function Home() {
  const recommendedPosts = mockTabPosts;

  return (
    <Container maxWidth="lg">
      {/* ヒーロー */}
      <Box
        sx={{
          py: 10,
          textAlign: "center",
        }}
      >
        <Typography variant="h2" component="h1">
          ベース道場
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mt: 2 }}
        >
          ベース初心者のための練習場所
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            mt: 4,
            justifyContent: "center",
          }}
        >
          <Button
            component={Link}
            to="/challenge"
            variant="contained"
            size="large"
          >
            挑戦する
          </Button>

          <Button
            component={Link}
            to="/create"
            variant="outlined"
            size="large"
          >
            譜面を作る
          </Button>
        </Stack>
      </Box>

      <Divider />

      {/* 今日のおすすめ */}
      <Box sx={{ py: 8 }}>
        <Typography variant="h4" component="h2">
          今日のおすすめ
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1, mb: 4 }}
        >
          初心者におすすめの練習フレーズです。
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {recommendedPosts.map((post) => (
            <Card key={post.id}>
              <CardContent>
                <Typography variant="h6">
                  {post.title}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ mt: 1, minHeight: 48 }}
                >
                  {post.description}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    mt: 2,
                    alignItems: "center",
                  }}
                >
                  <Rating
                    value={post.difficulty}
                    max={5}
                    readOnly
                  />

                  <Typography color="text.secondary">
                    {post.difficulty}/5
                  </Typography>
                </Stack>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  投稿者：{post.authorName}
                </Typography>
              </CardContent>

              <CardActions>
                <Button
                  component={Link}
                  to={`/challenge/${post.id}`}
                  size="small"
                >
                  挑戦する
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>

      <Divider />

      {/* ベース道場の使い方 */}
      <Box sx={{ py: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            textAlign: "center",
          }}
        >
          ベース道場の使い方
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 4,
            mt: 5,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3">
              ①
            </Typography>

            <Typography variant="h6" sx={{ mt: 2 }}>
              譜面を選ぶ
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              自分のレベルに合ったTAB譜を探します。
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3">
              ②
            </Typography>

            <Typography variant="h6" sx={{ mt: 2 }}>
              挑戦する
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              TAB譜を見ながら実際にベースを弾いてみます。
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3">
              ③
            </Typography>

            <Typography variant="h6" sx={{ mt: 2 }}>
              上達する
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              できるようになったら、次のフレーズに挑戦します。
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;