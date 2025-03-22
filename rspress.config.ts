import * as path from "node:path";
import { defineConfig } from "rspress/config";

export default defineConfig({
  root: path.join(__dirname, "docs"),
  title: "Agent TARS",
  icon: "/icon.png",
  logo: {
    light: "/icon.png",
    dark: "/icon.png",
  },
  builderConfig: {
    html: {
      template: "public/index.html",
      favicon:
        "https://github.com/bytedance/UI-TARS-desktop/blob/main/apps/ui-tars/resources/favicon-32x32.png?raw=true",
      meta: {
        description:
          "An open-source GUI agent designed to revolutionize multimodal interaction",
        // Twitter Card metadata
        "twitter:card": "summary_large_image",
        "twitter:site": "@AgentTars",
        "twitter:creator": "@AgentTars",
        "twitter:title": "Agent TARS - Open-source Multimodal AI Agent",
        "twitter:description":
          "An open-source multimodal AI agent designed to revolutionize GUI interaction by visually interpreting web pages and seamlessly integrating with command lines and file systems.",
        "twitter:image":
          "https://raw.githubusercontent.com/bytedance/UI-TARS-desktop/main/apps/agent-tars/static/hero.png",
        // Open Graph metadata (also used by Twitter)
        "og:title": "Agent TARS - Open-source Multimodal AI Agent",
        "og:description":
          "An open-source multimodal AI agent designed to revolutionize GUI interaction by visually interpreting web pages and seamlessly integrating with command lines and file systems.",
        "og:image":
          "https://raw.githubusercontent.com/bytedance/UI-TARS-desktop/main/apps/agent-tars/static/hero.png",
        "og:url": "https://agent-tars.com",
        "og:type": "website",
      },
      tags: [
        {
          tag: "script",
          attrs: {
            src: "https://www.googletagmanager.com/gtag/js?id=G-J82M1JQ6KF",
            async: true,
          },
          head: true,
          append: true,
        },
        {
          tag: "script",
          children: `window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      gtag("config", "G-J82M1JQ6KF");`,
          head: true,
          append: true,
        },
      ],
    },
  },
  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/web-infra-dev/rspress",
      },
    ],
  },
});
