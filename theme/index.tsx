import { NextUIProvider } from "@nextui-org/react";
import { Content } from "rspress/runtime";
import { Navbar } from "../src/render/components/Navbar";
import Home from "../src/render/pages/Home";
import Blog from "../src/render/pages/Blog";
import Showcase from "../src/render/pages/Showcase";
import ShowcaseDetail from "../src/render/pages/ShowcaseDetail";
import Docs from "../src/render/pages/Docs";
import { TwitterCardMeta } from "../src/render/components/TwitterCardMeta";
import "./entry.css";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// theme/index.tsx
function Layout() {
  return (
    <NextUIProvider>
      <HelmetProvider>
        <TwitterCardMeta />
        <Navbar />
        <Content />
      </HelmetProvider>
    </NextUIProvider>
  );
}

// The setup function will be called when the page is initialized. It is generally used to monitor global events, and it can be an empty function
const setup = () => {};

// Export all content of the default theme to ensure that your theme configuration can work properly
export * from "rspress/theme";

// Export Layout component and setup function
// Note: both must export
export default { Layout, setup };
