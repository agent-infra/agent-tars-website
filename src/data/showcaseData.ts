export type CategoryType = "finance" | "technology" | "science" | "general";

export interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  category: CategoryType;
  imageUrl: string;
  link: string;
  date?: string;
  languages?: string[];
  tags?: string[];
  author?: {
    github: string;
    name: string;
  };
}

export type Category = {
  id: string;
  name: string;
  description?: string;
};

export const categories: Category[] = [
  {
    id: "finance",
    name: "Finance",
    description: "Financial analysis and reports",
  },
  {
    id: "technology",
    name: "Technology",
    description: "Tech innovations and solutions",
  },
  {
    id: "science",
    name: "Science",
    description: "Scientific research and discoveries",
  },
  {
    id: "general",
    name: "General",
    description: "General purpose applications",
  },
];

export const showcaseItems: ShowcaseItem[] = [
  {
    id: "tesla-stock-decline-reasons",
    title: "Reasons behind Tesla's recent stock price decline",
    description: "Why has Tesla's stock price recently fallen?",
    category: "finance",
    imageUrl:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop",
    link: "https://sf16-sg.tiktokcdn.com/obj/eden-sg/psvhouloj/agent-tars/tesla-stock-decline-reasons.html",
    date: "2025-03-18",
    languages: ["English"],
    author: {
      github: "ycjcl868",
      name: "Charles",
    },
  },
  {
    id: "kipchoge-marathon-moon",
    title:
      "Time for Eliud Kipchoge to run Earth-Moon distance at marathon pace",
    description:
      "If Eliud Kipchoge could maintain his record-making marathon pace indefinitely, how many thousand hours would it take him to run the distance between the Earth and the Moon its closest approach? Please use the minimum perigee value on the Wikipedia page for the Moon when carrying out your calculation. Round your result to the nearest 1000 hours and do not use any comma separators if necessary.",
    category: "science",
    imageUrl:
      "https://cdn.mos.cms.futurecdn.net/p7rWPJoYDKZ4wwoXHGmzPL-1200-80.jpg",
    link: "https://sf16-sg.tiktokcdn.com/obj/eden-sg/psvhouloj/agent-tars/kipchoge-marathon-moon.html",
    date: "2025-03-18",
    languages: ["English"],
    author: {
      github: "skychx",
      name: "skychx",
    },
  },
  {
    id: "7-day-trip-plan-to-mexico-city",
    title: "7-day trip plan to Mexico City from NYC",
    description:
      "I need a 7-day trip to Mexico City from NYC for April 15-23, with a budget of $2500-5000 for my fiancee and I. We love historical sites, hidden gems, and Mexican culture (Mexican art, architecture, food). We want to visit the pyramids of Teotihuacan and explore the city on foot. I plan to propose during this trip and need suggestions for a special venue. Please provide a detailed itinerary and a simple HTML travel brochure with maps, descriptions of attractions, essential basic Spanish phrases, and travel tips that we can refer to throughout our trip.",
    category: "general",
    imageUrl:
      "https://www.cataloniahotels.com/en/blog/wp-content/uploads/2017/09/cataloniahotels-mexico2.jpg",
    link: "https://sf16-sg.tiktokcdn.com/obj/eden-sg/psvhouloj/agent-tars/7-day-trip-plan-to-mexico-city.html",
    date: "2025-03-18",
    languages: ["English", "Spanish"],
    author: {
      github: "ulivz",
      name: "ULIVZ",
    },
    
  },
  {
    id: "lynx-repository-issues-report",
    title: "Analyse issues in the Lynx repository",
    description:
      "Summarize the issues in this repository: https://github.com/lynx-family/lynx and generate a detailed report page contains good data visualization.",
    category: "technology",
    imageUrl:
      "https://sf16-sg.tiktokcdn.com/obj/eden-sg/psvhouloj/images/lynx.png",
    link: "https://sf16-sg.tiktokcdn.com/obj/eden-sg/psvhouloj/agent-tars/lynx-repository-issues-report.html",
    date: "2025-03-18",
    languages: ["English"],
    author: {
      github: "ulivz",
      name: "ULIVZ",
    },
  },
  {
    id: "lynx-repository-issues-report",
    title: "Technical analysis of Tesla's future stock price trends",
    description: "从技术面分析下特斯拉未来的股价走势",
    category: "finance",
    imageUrl:
      "https://sf16-sg.tiktokcdn.com/obj/eden-sg/psvhouloj/images/tesla-stock.png",
    link: "https://sf16-sg.tiktokcdn.com/obj/eden-sg/psvhouloj/agent-tars/tesla-stock-technical-analysis.html",
    date: "2025-03-20",
    languages: ["Chinese"],
    author: {
      github: "ycjcl868",
      name: "Charles",
    },
  },
  {
    id: "hangzhou-to-weihai-travel-plan",
    title: "Travel plan from Hangzhou to Weihai in detailed markdown format",
    description:
      "我想要在 2025 年清明节假期从杭州去威海旅游，给我规划旅游计划，用详细的 markdown 输出",
    category: "general",
    imageUrl:
      "https://sf16-sg.tiktokcdn.com/obj/eden-sg/psvhouloj/images/weihai.jpeg",
    link: "https://sf16-sg.tiktokcdn.com/obj/eden-sg/psvhouloj/agent-tars/hangzhou-to-weihai-travel-plan.html",
    date: "2025-03-20",
    languages: ["Chinese"],
    author: {
      github: "sanyuan0704",
      name: "yangxingyuan",
    },
  },
];

// Helper function to get items by category
export const getItemsByCategory = (categoryId: string): ShowcaseItem[] => {
  return categoryId === "all"
    ? showcaseItems
    : showcaseItems.filter((item) => item.category === categoryId);
};

// Helper function to get all categories with counts
export const getCategoriesWithCounts = (): (Category & { count: number })[] => {
  return categories.map((category) => ({
    ...category,
    count: showcaseItems.filter((item) => item.category === category.id).length,
  }));
};
