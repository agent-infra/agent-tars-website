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
  },
  {
    id: "lynx-repository-issues-report",
    title: "Analyse issues in the Lynx repository",
    description:
      "Summarize the issues in this repository: https://github.com/lynx-family/lynx and generate a detailed report page contains good data visualization.",
    category: "technology",
    imageUrl:
      "https://private-user-images.githubusercontent.com/9161085/418362045-23e35f90-1506-4b1d-8114-6bb2b8b643e7.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDI0MTQ3NjQsIm5iZiI6MTc0MjQxNDQ2NCwicGF0aCI6Ii85MTYxMDg1LzQxODM2MjA0NS0yM2UzNWY5MC0xNTA2LTRiMWQtODExNC02YmIyYjhiNjQzZTcucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI1MDMxOSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNTAzMTlUMjAwMTA0WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9YjhjZjcxMmZiYmNhMjU1ZmQ5ZTYxYTlhMjUzOTc1N2Q0ZDEzZWQyZTZhZDFkZjEwMTQ3MDg0NTIyNjk4ZmRhOCZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.ESRy_pXMjKAA5Trj12Ha6DbhxPAEDaMWQ7tnshGa-w4",
    link: "https://sf16-sg.tiktokcdn.com/obj/eden-sg/psvhouloj/agent-tars/lynx-repository-issues-report.html",
    date: "2025-03-18",
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
