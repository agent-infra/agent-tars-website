import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginHtmlGenerator } from "./src/build/htmlGeneratorPlugin";

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginHtmlGenerator({
      verbose: true,
    }),
  ],
  tools: {
    rspack: (config) => {
      config.module!.rules!.push({
        test: /\.md$/,
        type: "asset/source",
      });
      return config;
    },
  },
  source: {
    entry: {
      index: "./src/render/entry.tsx",
    },
  },
  server: {
    historyApiFallback: true,
  },
  html: {
    title: "Agent TARS",
    template: 'public/index.html',
    favicon:
      "https://github.com/bytedance/UI-TARS-desktop/blob/main/apps/ui-tars/resources/favicon-32x32.png?raw=true",
    meta: {
      description:
        "An open-source GUI agent designed to revolutionize multimodal interaction",
      // Twitter Card metadata
      'twitter:card': 'summary_large_image',
      'twitter:site': '@AgentTars',
      'twitter:creator': '@AgentTars',
      'twitter:title': 'Agent TARS - Open-source Multimodal AI Agent',
      'twitter:description': 'An open-source multimodal AI agent designed to revolutionize GUI interaction by visually interpreting web pages and seamlessly integrating with command lines and file systems.',
      'twitter:image': 'https://github.com/bytedance/UI-TARS-desktop/blob/main/apps/agent-tars/public/twitter-card.png?raw=true',
      // Open Graph metadata (also used by Twitter)
      'og:title': 'Agent TARS - Open-source Multimodal AI Agent',
      'og:description': 'An open-source multimodal AI agent designed to revolutionize GUI interaction by visually interpreting web pages and seamlessly integrating with command lines and file systems.',
      'og:image': 'https://github.com/bytedance/UI-TARS-desktop/blob/main/apps/agent-tars/public/twitter-card.png?raw=true',
      'og:url': 'https://agent-tars.com',
      'og:type': 'website',
    },
  },
});
