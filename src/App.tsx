import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Showcase from "./pages/Showcase";
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
    <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
    </HashRouter>
  );
};

export default App;
