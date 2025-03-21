export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  excerpt: string;
  content?: string;
  tags?: string[];
  coverImage?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "announcing-agent-tars-app",
    title: "Announcing Agent TARS App (Preview)",
    slug: "announcing-agent-tars-app",
    date: "2025-03-18",
    author: "Agent TARS Team",
    excerpt:
      "We're excited to announce the preview release of Agent TARS, an open-source multimodal agent designed to revolutionize GUI interaction.",
    tags: ["announcement", "release"],
  },
];

// Get permalink for a blog post
export const getBlogPermalink = (post: BlogPost): string => {
  const date = new Date(post.date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `/${year}/${month}/${day}/${post.slug}`;
};

// Parse permalink to extract date and slug
export const parsePermalink = (
  permalink: string
): { year: string; month: string; day: string; slug: string } | null => {
  const regex = /\/(\d{4})\/(\d{2})\/(\d{2})\/([^\/]+)/;
  const match = permalink.match(regex);

  if (match) {
    return {
      year: match[1],
      month: match[2],
      day: match[3],
      slug: match[4],
    };
  }

  return null;
};

// Get blog post by permalink
export const getBlogPostByPermalink = (
  permalink: string
): BlogPost | undefined => {
  const parsed = parsePermalink(permalink);

  if (!parsed) return undefined;

  const { year, month, day, slug } = parsed;
  const dateStr = `${year}-${month}-${day}`;

  return blogPosts.find((post) => post.date === dateStr && post.slug === slug);
};

// Get all blog posts sorted by date (newest first)
export const getSortedBlogPosts = (): BlogPost[] => {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};
