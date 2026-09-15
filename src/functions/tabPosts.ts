import type { Tab } from "../types/create";
import type { TabPost } from "../types/challenge";
import { supabase } from "../utils/supabase";

export interface NewTabPost {
  title: string;
  description: string;
  difficulty: number;
  authorName: string;
  score: Tab;
}

export const fetchTabPosts = async (): Promise<TabPost[]> => {
  const { data, error } = await supabase
    .from("tab_posts")
    .select("id, title, description, difficulty, author_name, score")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    difficulty: post.difficulty,
    authorName: post.author_name,
    score: post.score as Tab,
  }));
};

export const createTabPost = async (post: NewTabPost): Promise<TabPost> => {
  const { data: { user } } = await supabase.auth.getUser();
  const displayName = user?.user_metadata.display_name;
  const authorName = typeof displayName === "string" && displayName.trim() !== ""
    ? displayName.trim()
    : post.authorName;
  const { data, error } = await supabase
    .from("tab_posts")
    .insert({
      title: post.title,
      description: post.description,
      difficulty: post.difficulty,
      author_name: authorName,
      score: post.score,
    })
    .select("id, title, description, difficulty, author_name, score")
    .single();

  if (error) throw error;

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    difficulty: data.difficulty,
    authorName: data.author_name,
    score: data.score as Tab,
  };
};
