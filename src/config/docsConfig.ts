export interface DocItem {
  id: string;
  title: string;
  path: string;
  githubPath: string;
  category?: string;
}

export const availableDocs: DocItem[] = [
  {
    id: "quick-start",
    title: "Quick Start",
    path: "quick-start",
    githubPath:
      "https://raw.githubusercontent.com/bytedance/UI-TARS-desktop/refs/heads/main/apps/agent-tars/docs/quick-start.md",
    category: "Getting Started"
  },
  // {
  //   id: "installation",
  //   title: "Installation",
  //   path: "installation",
  //   githubPath:
  //     "https://raw.githubusercontent.com/bytedance/UI-TARS-desktop/refs/heads/main/apps/agent-tars/docs/quick-start.md",
  //   category: "Getting Started"
  // },
  // {
  //   id: "configuration",
  //   title: "Configuration",
  //   path: "configuration",
  //   githubPath:
  //     "https://raw.githubusercontent.com/bytedance/UI-TARS-desktop/refs/heads/main/apps/agent-tars/docs/quick-start.md",
  //   category: "Guides"
  // },
  // {
  //   id: "api-reference",
  //   title: "API Reference",
  //   path: "api-reference",
  //   githubPath:
  //     "https://raw.githubusercontent.com/bytedance/UI-TARS-desktop/refs/heads/main/apps/agent-tars/docs/quick-start.md",
  //   category: "Reference"
  // },
  // {
  //   id: "plugins",
  //   title: "Plugins",
  //   path: "plugins",
  //   githubPath:
  //     "https://raw.githubusercontent.com/bytedance/UI-TARS-desktop/refs/heads/main/apps/agent-tars/docs/quick-start.md",
  //   category: "Extensions"
  // }
];

// Group docs by category
export const getDocsByCategory = () => {
  const categories: Record<string, DocItem[]> = {};
  
  availableDocs.forEach(doc => {
    const category = doc.category || 'Uncategorized';
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(doc);
  });
  
  return categories;
};
