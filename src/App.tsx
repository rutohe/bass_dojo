import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Create from "./pages/Create";
import Challenge from "./pages/Challenge";
import { mockTabPosts } from "./mock/tabpost";
import { mockTab } from "./mock/create";

import type { TabPost } from "./types/challenge";
import type { Tab } from "./types/create";

function App() {
  const [allPost,setAllPost] = useState<TabPost[]>(mockTabPosts);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create/>} />
        <Route path="/challenge" element={<Challenge
          allPost={allPost}
        />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;