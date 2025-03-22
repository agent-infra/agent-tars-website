export interface DocItem {
  id: string;
  title: string;
  // path: string;

  githubPath?: string;
  localPath?: string;
  category?: string;
  publishDate?: string;
  author?: string;
}

export const availableDocs: DocItem[] = [
  {
    id: "quick-start",
    title: "Quick Start",
    // path: "quick-start",
    // using local file for better performance
    localPath: "quick-start",
    // githubPath:
    // "https://raw.githubusercontent.com/bytedance/UI-TARS-desktop/refs/heads/main/apps/agent-tars/docs/quick-start.md",
    category: "Getting Started",
    publishDate: "2025-03-18",
    // author: "Agent TARS Team",
  },
  {
    id: "trouble-shooting",
    title: "Trouble Shooting",
    localPath: "trouble-shooting",
    category: "Getting Started",
    publishDate: "2025-03-22",
    // author: "Agent TARS Team",
  },
];

// Group docs by category
export const getDocsByCategory = () => {
  const categories: Record<string, DocItem[]> = {};

  availableDocs.forEach((doc) => {
    const category = doc.category || "Uncategorized";
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(doc);
  });

  return categories;
};
