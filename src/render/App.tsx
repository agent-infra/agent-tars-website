import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Showcase from "./pages/Showcase";
import ShowcaseDetail from "./pages/ShowcaseDetail";
import Docs from "./pages/Docs";
import { TwitterCardMeta } from "./components/TwitterCardMeta";
import { HelmetProvider } from "react-helmet-async";

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <TwitterCardMeta />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/:year/:month/:day/:slug" element={<Blog />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/showcase/:id" element={<ShowcaseDetail />} />
          <Route path="/doc" element={<Docs />} />
          <Route path="/doc/:docId" element={<Docs />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
