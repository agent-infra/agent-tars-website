import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
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
    template: './public/index.html',
    favicon: 'https://github.com/bytedance/UI-TARS-desktop/blob/main/apps/ui-tars/resources/favicon-32x32.png?raw=true',
    meta: {
      description:
        "An open-source GUI agent designed to revolutionize multimodal interaction",
    },
  },
});
