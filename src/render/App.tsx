import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Showcase from "./pages/Showcase";
import ShowcaseDetail from "./pages/ShowcaseDetail";
import Docs from "./pages/Docs";
import { PasswordProtection } from "./components/PasswordProtection";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <PasswordProtection 
        correctPassword="agentic" 
        onSuccess={() => setIsAuthenticated(true)} 
      />
    );
  }

  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/:year/:month/:day/:slug" element={<Blog />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/showcase/:id" element={<ShowcaseDetail />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/:docId" element={<Docs />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
