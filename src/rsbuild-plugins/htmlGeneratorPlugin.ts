import fs from "fs";
import path from "path";
import type { RsbuildPlugin } from "@rsbuild/core";
import { availableDocs } from "../config/docsConfig";

export interface HtmlGeneratorOptions {
  /**
   * Additional static route paths, will generate corresponding HTML files for each path
   * @default []
   */
  additionalRoutes?: string[];

  /**
   * Whether to generate HTML files for document routes
   * @default true
   */
  generateDocRoutes?: boolean;

  /**
   * Whether to output generation info to console
   * @default true
   */
  verbose?: boolean;
}

/**
 * Rsbuild plugin to create multiple HTML file outputs for SPA
 * Solves the 404 problem when directly accessing non-root paths
 *
 * @see BrowserRouter is not compatible within a GitHub Pages deployment
 * @see https://github.com/orgs/community/discussions/36010
 */
export const pluginHtmlGenerator = (
  options: HtmlGeneratorOptions = {}
): RsbuildPlugin => ({
  name: "rsbuild:html-generator",

  setup(api) {
    // Execute after build completion
    api.onAfterBuild(() => {
      try {
        const config = api.getNormalizedConfig();
        const outputDir = config.output.distPath.root;

        // Default static routes list
        const staticRoutes = ["/blog", "/showcase", "/docs"];

        // Merge user-provided additional routes
        if (options.additionalRoutes?.length) {
          staticRoutes.push(...options.additionalRoutes);
        }

        // Get dynamic routes from availableDocs
        const docRoutes =
          options.generateDocRoutes !== false
            ? availableDocs.map((doc) => `/${doc.id}`)
            : [];




        // Read original index.html content
        const indexPath = path.join(outputDir, "index.html");
        if (!fs.existsSync(indexPath)) {
          throw new Error("index.html not found in output directory");
        }

        const indexContent = fs.readFileSync(indexPath, "utf-8");

        // Create corresponding HTML files for each route

        for (const route of staticRoutes) {
          // Remove leading slash
          const routePath = route.startsWith("/") ? route.substring(1) : route;

          // Create directory
          const dirPath = path.join(outputDir, routePath);
          if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
          }

          // Write HTML file
          const htmlPath = path.join(dirPath, "index.html");
          fs.writeFileSync(htmlPath, indexContent);

          if (options.verbose !== false) {
            console.log(`[html-generator] Generated HTML for route: ${route}`);
          }
        }

        // Handle doc routes differently - generate id.html files directly in output directory
        for (const route of docRoutes) {
          // Remove leading slash and create filename
          const routeId = route.startsWith("/") ? route.substring(1) : route;
          const htmlPath = path.join(outputDir, `${routeId}.html`);
          
          // Write HTML file
          fs.writeFileSync(htmlPath, indexContent);

          if (options.verbose !== false) {
            console.log(`[html-generator] Generated HTML for doc: ${route} as ${routeId}.html`);
          }
        }

        if (options.verbose !== false) {
          console.log(

            `[html-generator] Successfully generated ${staticRoutes.length + docRoutes.length} HTML files`
          );
        }
      } catch (error) {
        console.error(
          `[html-generator] Error: ${
            error instanceof Error ? error.message : error
          }`
        );
      }
    });
  },
});