import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Showcase from "./pages/Showcase";

const App: React.FC = () => {
  return (
    <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/showcase" element={<Showcase />} />
        </Routes>
    </HashRouter>
  );
};

export default App;
