import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginHtmlGenerator } from "./src/rsbuild-plugins/htmlGeneratorPlugin";

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginHtmlGenerator({
      // additionalRoutes: ['/about', '/contact'],
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
      index: "./src/entry.tsx",
    },
  },
  server: {
    historyApiFallback: true,
  },
  html: {
    title: "Agent TARS",
    favicon:
      "https://github.com/bytedance/UI-TARS-desktop/blob/main/apps/ui-tars/resources/favicon-32x32.png?raw=true",
    meta: {
      description:
        "An open-source GUI agent designed to revolutionize multimodal interaction",
    },
  },
});
