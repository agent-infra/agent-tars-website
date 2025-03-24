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
    localPath: "quick-start",
    category: "Guide",
    publishDate: "2025-03-18",
  },
  {
    id: "trouble-shooting",
    title: "Trouble Shooting",
    localPath: "trouble-shooting",
    category: "Guide",
    publishDate: "2025-03-22",
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
