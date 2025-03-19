export interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  link: string;
  date?: string;
}

export type Category = {
  id: string;
  name: string;
  description?: string;
}

export const categories: Category[] = [
  { id: "finance", name: "Finance", description: "Financial analysis and reports" },
  { id: "technology", name: "Technology", description: "Tech innovations and solutions" },
  { id: "science", name: "Science", description: "Scientific research and discoveries" },
  { id: "general", name: "General", description: "General purpose applications" }
];

export const showcaseItems: ShowcaseItem[] = [
  {
    id: "financial-report-q1",
    title: "Q1 Financial Analysis",
    description: "Comprehensive financial analysis for Q1 2025",
    category: "finance",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop",
    link: "https://cdn-tos-cn.bytedance.net/obj/aipa-tos/a6310bde-11b8-41ae-b7bb-f459018376b7-report.html",
    date: "2025-04-15"
  },
  {
    id: "ai-breakthrough",
    title: "AI Research Breakthrough",
    description: "Latest advancements in artificial intelligence research",
    category: "technology",
    imageUrl: "https://images.unsplash.com/photo-1677442135136-760c813170d6?q=80&w=1000&auto=format&fit=crop",
    link: "https://cdn-tos-cn.bytedance.net/obj/aipa-tos/a6310bde-11b8-41ae-b7bb-f459018376b7-report.html",
    date: "2025-03-22"
  },
  {
    id: "quantum-computing",
    title: "Quantum Computing Advances",
    description: "Exploring the latest developments in quantum computing",
    category: "science",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop",
    link: "https://cdn-tos-cn.bytedance.net/obj/aipa-tos/a6310bde-11b8-41ae-b7bb-f459018376b7-report.html",
    date: "2025-02-10"
  },
  {
    id: "market-trends",
    title: "2025 Market Trends",
    description: "Analysis of emerging market trends for 2025",
    category: "finance",
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1000&auto=format&fit=crop",
    link: "https://cdn-tos-cn.bytedance.net/obj/aipa-tos/a6310bde-11b8-41ae-b7bb-f459018376b7-report.html",
    date: "2025-01-05"
  },
  {
    id: "renewable-energy",
    title: "Renewable Energy Solutions",
    description: "Innovative approaches to renewable energy implementation",
    category: "technology",
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000&auto=format&fit=crop",
    link: "https://cdn-tos-cn.bytedance.net/obj/aipa-tos/a6310bde-11b8-41ae-b7bb-f459018376b7-report.html",
    date: "2024-12-18"
  },
  {
    id: "climate-research",
    title: "Climate Change Research",
    description: "Latest findings in climate science and environmental impact",
    category: "science",
    imageUrl: "https://images.unsplash.com/photo-1569163139599-0f4517e36f31?q=80&w=1000&auto=format&fit=crop",
    link: "https://cdn-tos-cn.bytedance.net/obj/aipa-tos/a6310bde-11b8-41ae-b7bb-f459018376b7-report.html",
    date: "2024-11-30"
  },
  {
    id: "productivity-tools",
    title: "Productivity Tools",
    description: "Essential tools to boost your productivity",
    category: "general",
    imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1000&auto=format&fit=crop",
    link: "https://cdn-tos-cn.bytedance.net/obj/aipa-tos/a6310bde-11b8-41ae-b7bb-f459018376b7-report.html",
    date: "2024-10-25"
  },
  {
    id: "data-visualization",
    title: "Data Visualization Techniques",
    description: "Modern approaches to visualizing complex data sets",
    category: "technology",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    link: "https://cdn-tos-cn.bytedance.net/obj/aipa-tos/a6310bde-11b8-41ae-b7bb-f459018376b7-report.html",
    date: "2024-09-14"
  },
  {
    id: "investment-strategies",
    title: "Investment Strategies",
    description: "Expert insights on investment approaches for 2025",
    category: "finance",
    imageUrl: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?q=80&w=1000&auto=format&fit=crop",
    link: "https://cdn-tos-cn.bytedance.net/obj/aipa-tos/a6310bde-11b8-41ae-b7bb-f459018376b7-report.html",
    date: "2024-08-22"
  },
  {
    id: "genomics-research",
    title: "Genomics Research",
    description: "Breakthrough discoveries in genomics and gene therapy",
    category: "science",
    imageUrl: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=1000&auto=format&fit=crop",
    link: "https://cdn-tos-cn.bytedance.net/obj/aipa-tos/a6310bde-11b8-41ae-b7bb-f459018376b7-report.html",
    date: "2024-07-11"
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Trends",
    description: "Emerging trends in digital marketing and consumer engagement",
    category: "general",
    imageUrl: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1000&auto=format&fit=crop",
    link: "https://cdn-tos-cn.bytedance.net/obj/aipa-tos/a6310bde-11b8-41ae-b7bb-f459018376b7-report.html",
    date: "2024-06-05"
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Best Practices",
    description: "Essential security measures for digital protection",
    category: "technology",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000&auto=format&fit=crop",
    link: "https://cdn-tos-cn.bytedance.net/obj/aipa-tos/a6310bde-11b8-41ae-b7bb-f459018376b7-report.html",
    date: "2024-05-19"
  }
];

// Helper function to get items by category
export const getItemsByCategory = (categoryId: string): ShowcaseItem[] => {
  return categoryId === "all" 
    ? showcaseItems 
    : showcaseItems.filter(item => item.category === categoryId);
};

// Helper function to get all categories with counts
export const getCategoriesWithCounts = (): (Category & { count: number })[] => {
  return categories.map(category => ({
    ...category,
    count: showcaseItems.filter(item => item.category === category.id).length
  }));
};
