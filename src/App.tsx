import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

import Home from "./pages/Home";
import Create from "./pages/Create";
import Challenge from "./pages/Challenge";
import ChallengeDetail from "./pages/ChallengeDetail";
import AuthModal from "./components/AuthModal";
import { createTabPost, fetchTabPosts } from "./functions/tabPosts";
import { supabase } from "./utils/supabase";

import type { TabPost } from "./types/challenge";
import type { Tab } from "./types/create";
import type { PostDetails } from "./components/PostModal";
import type { Session } from "@supabase/supabase-js";

function App() {
  const [allPost,setAllPost] = useState<TabPost[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, nextSession) => {
      setSession(nextSession);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setAllPost(await fetchTabPosts());
      } catch (error) {
        console.error("投稿一覧の取得に失敗しました", error);
      } finally {
        setIsPostsLoading(false);
      }
    };

    void loadPosts();
  }, []);
  const publishPost = async (post: PostDetails & { score: Tab }) => {
    if (session === null) throw new Error("投稿するにはログインが必要です。");
    const createdPost = await createTabPost({
      ...post,
      authorName: "ゲスト",
    });
    setAllPost((previousPosts) => [createdPost, ...previousPosts]);
    return;

    setAllPost((previousPosts) => [
      {
        id: crypto.randomUUID(),
        authorName: "ゲスト",
        ...post,
      },
      ...previousPosts,
    ]);
  };
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Bass Dojo</Typography>
          {session === null ? (
            <Button color="inherit" onClick={() => setIsAuthModalOpen(true)}>ログイン</Button>
          ) : (
            <>
              <Typography variant="body2">
                {typeof session.user.user_metadata.display_name === "string"
                  ? session.user.user_metadata.display_name
                  : "ログイン中"}
              </Typography>
              <Button color="inherit" onClick={() => void supabase.auth.signOut()}>ログアウト</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home allPost={allPost} isLoading={isPostsLoading} />} />
        <Route path="/create" element={<Create onPublish={publishPost} isAuthenticated={session !== null} />} />
        <Route path="/challenge" element={<Challenge
          allPost={allPost}
          isLoading={isPostsLoading}
        />} />
        <Route path="/challenge/:postId" element={<ChallengeDetail allPost={allPost} isLoading={isPostsLoading} />} />
      </Routes>
      <AuthModal open={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </BrowserRouter>
  );
}

export default App;
