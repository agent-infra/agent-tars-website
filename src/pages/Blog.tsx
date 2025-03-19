import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { getBlogContent } from '../utils/blogLoader';
import { getSortedBlogPosts, getBlogPostByPermalink, getBlogPermalink, BlogPost } from '../config/blogConfig';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { motion } from 'framer-motion';
import { Button, Card, Spinner, Divider } from '@nextui-org/react';
import { FiArrowLeft, FiCalendar, FiUser } from 'react-icons/fi';
import { TableOfContents } from '../components/TableOfContents';

const Blog: React.FC = () => {
  const { year, month, day, slug } = useParams();
  const location = useLocation();
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Check if we're on a specific blog post page
  const isPostPage = year && month && day && slug;
  const currentPost = isPostPage 
    ? getBlogPostByPermalink(`/${year}/${month}/${day}/${slug}`)
    : undefined;
  
  // Get all blog posts for the listing page
  const allPosts = getSortedBlogPosts();
  
  useEffect(() => {
    const loadContent = async () => {
      if (!currentPost) {
        setIsLoading(false);
        return;
      }

      try {
        // Try to get content from local files
        const localContent = getBlogContent(currentPost.id);
        if (localContent) {
          setContent(localContent);
        } else {
          // Fallback to dynamic import
          try {
            const module = await import(`../blog/${currentPost.id}.md`);
            setContent(module.default);
          } catch (err) {
            console.error("Failed to load blog content:", err);
            setContent("# Error\nFailed to load blog content.");
          }
        }
      } catch (error) {
        console.error("Failed to load blog content:", error);
        setContent("# Error\nFailed to load blog content.");
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    loadContent();
  }, [currentPost]);

  // Render blog post detail page
  if (isPostPage) {
    return (
      <div className="min-h-screen pt-24 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button 
              as={Link}
              to="/blog"
              variant="light" 
              color="default" 
              startContent={<FiArrowLeft />}
              className="mb-6"
            >
              Back to Blog
            </Button>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Spinner size="lg" color="white" />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="markdown-body bg-transparent text-white mb-16"
              >
                <div className="flex justify-between items-center mb-4">
                  <div></div>
                  <TableOfContents markdown={content} />
                </div>
                <MarkdownRenderer 
                  content={content} 
                  publishDate={currentPost?.date}
                  author={currentPost?.author}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Render blog listing page
  return (
    <div className="min-h-screen pt-24 px-4 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-xl text-gray-400">
            Latest updates and insights from the Agent TARS team
          </p>
        </motion.div>

        <div className="space-y-8">
          {allPosts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Blog post card component for the listing page
const BlogPostCard: React.FC<{ post: BlogPost; index: number }> = ({ post, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-white/5 hover:bg-white/10 transition-colors border border-white/10 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <FiCalendar className="text-gray-500" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiUser className="text-gray-500" />
              <span>{post.author}</span>
            </div>
          </div>
          
          <Link to={getBlogPermalink(post)} className="block group">
            <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">
              {post.title}
            </h2>
            <p className="text-gray-400 mb-4">{post.excerpt}</p>
          </Link>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags?.map(tag => (
              <span 
                key={tag}
                className="px-3 py-1 bg-white/10 text-white/70 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <Button
            as={Link}
            to={getBlogPermalink(post)}
            color="secondary" 
            variant="flat" 
            size="sm"
          >
            Read more
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default Blog;
