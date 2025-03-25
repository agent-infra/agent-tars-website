import React, { useState } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { remarkAlert } from "remark-github-blockquote-alert";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { Modal, Box } from "@mui/material";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import "highlight.js/styles/github-dark.css";
import { motion, AnimatePresence } from "framer-motion";
=======
import AlertBox from "./AlertBox";
import 'remark-github-blockquote-alert/alert.css'
>>>>>>> 58e2ccc (feat: enable `remark-github-blockquote-alert`)

interface MarkdownRendererProps {
  content: string;
  publishDate?: string;
  author?: string;
  className?: string;
}

/**
 * Component that renders an anchor link for headers
 * Allows users to copy direct links to specific sections
 */
const HeaderAnchor = ({ id }: { id: string }) => {
  // Copy the full URL with hash to clipboard
  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
  };

  // Handle anchor click to update URL and scroll smoothly
  const handleAnchorClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Update URL without page reload
    window.history.pushState(null, "", `#${id}`);

    // Scroll to target element
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a
      href={`#${id}`}
      onClick={handleAnchorClick}
      className="opacity-0 group-hover:opacity-100 ml-2 text-gray-500 hover:text-blue-400 transition-all"
      title="Copy link to this section"
      aria-label="Copy link to this section"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
        onClick={(e) => {
          e.preventDefault();
          handleCopyLink();
        }}
      >
        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
      </svg>
    </a>
  );
};

/**
 * MarkdownRenderer component
 * Renders markdown content with custom styling and enhanced functionality
 */
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  publishDate,
  author,
  className = "", // 默认为空字符串
}) => {
  const [openImage, setOpenImage] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageClick = (src: string) => {
    setImageLoaded(false);
    setOpenImage(src);
  };

  const handleCloseModal = () => {
    setOpenImage(null);
  };

  const components: Components = {
    h1: ({ node, children, ...props }) => {
      const id = children
        ?.toString()
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");
      return (
        <>
          <h1
            id={id}
            className="text-4xl font-bold mb-2 pb-2 border-b border-white/10 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent scroll-mt-20"
            {...props}
          >
            {children}
          </h1>
          {(publishDate || author) && (
            <div className="flex items-center gap-1 mb-6 text-sm text-gray-400 mb-10">
              {publishDate && <span>{publishDate}</span>}
              {author && (
                <>
                  {publishDate && <span>•</span>}
                  <span>{author}</span>
                </>
              )}
            </div>
          )}
        </>
      );
    },
    h2: ({ node, children, ...props }) => {
      const id = children
        ?.toString()
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");
      return (
        <h2
          id={id}
          className="text-3xl font-bold mt-12 mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent scroll-mt-20"
          {...props}
        >
          {children}
        </h2>
      );
    },
    h3: ({ node, children, ...props }) => {
      const id = children
        ?.toString()
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");
      return (
        <h3
          id={id}
          className="text-2xl font-semibold mt-8 mb-3 text-white/90 scroll-mt-20"
          {...props}
        >
          {children}
        </h3>
      );
    },
    h4: ({ node, children, ...props }) => {
      const id = children
        ?.toString()
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");
      return (
        <h4
          id={id}
          className="text-xl font-semibold mt-6 mb-2 text-white/80 scroll-mt-20"
          {...props}
        >
          {children}
        </h4>
      );
    },
    p: ({ node, ...props }) => (
      <p className="my-4 text-gray-300 leading-relaxed" {...props} />
    ),
    a: ({ node, href, ...props }) => {
      // 检查是否为站内链接（不以 http:// 或 https:// 开头，且以 / 开头）
      const isInternalLink =
        href && !href.match(/^(https?:)?\/\//) && href.startsWith("/");

      if (isInternalLink) {
        return (
          <Link
            to={href}
            className="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2"
            {...props}
          />
        );
      }

      // 外部链接保持不变
      return (
        <a
          href={href}
          className="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      );
    },
    ul: ({ node, ...props }) => (
      <ul className="my-4 list-disc pl-6 text-gray-300" {...props} />
    ),
    ol: ({ node, ...props }) => (
      <ol className="my-4 list-decimal pl-6 text-gray-300" {...props} />
    ),
    li: ({ node, ...props }) => <li className="my-1" {...props} />,
    blockquote: ({ node, ...props }) => (
      <blockquote
        className="border-l-4 border-purple-500 pl-4 my-4 italic text-gray-400"
        {...props}
      />
    ),
    code: ({ node, className, children, ...props }) => {
      if (!className) {
        return (
          <code
            className="bg-white/10 text-purple-500 px-1.5 py-0.5 rounded text-sm font-mono"
            {...props}
          >
            {children}
          </code>
        );
      }

      const match = /language-(\w+)/.exec(className || "");

      if (match) {
        return (
          <div className="relative my-6 group">
            <div className="absolute top-0 right-0 bg-white/10 rounded-bl rounded-tr px-2 py-1 text-xs text-gray-400 font-mono">
              {match[1] || "code"}
            </div>
            <pre className="bg-[#282c34] backdrop-blur-sm border border-white/10 rounded-lg overflow-x-auto text-sm font-mono shadow-lg">
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          </div>
        );
      }
    },
    table: ({ node, ...props }) => (
      <div className="overflow-x-auto my-6">
        <table
          className="min-w-full border-collapse border border-white/20 text-sm"
          {...props}
        />
      </div>
    ),
    thead: ({ node, ...props }) => <thead className="bg-white/5" {...props} />,
    tbody: ({ node, ...props }) => (
      <tbody className="divide-y divide-white/10" {...props} />
    ),
    tr: ({ node, ...props }) => (
      <tr className="hover:bg-white/5 transition-colors" {...props} />
    ),
    th: ({ node, ...props }) => (
      <th
        className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-b border-white/20"
        {...props}
      />
    ),
    td: ({ node, ...props }) => (
      <td className="px-4 py-3 text-gray-400 border-white/10" {...props} />
    ),
    img: ({ node, src, ...props }) => (
      // @ts-expect-error
      <motion.img
        className="max-w-full h-auto my-6 rounded-lg border border-white/10 shadow-lg cursor-pointer"
        src={src}
        onClick={() => src && handleImageClick(src)}
        {...props}
        alt={props.alt || "Documentation image"}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      />
    ),
    hr: ({ node, ...props }) => (
      <hr className="my-8 border-t border-white/10" {...props} />
    ),
  };

  return (
    <>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          [rehypeHighlight, { detect: true, ignoreMissing: true }],
        ]}
        components={components}
      >
        {content}
      </ReactMarkdown>
      <AnimatePresence>
        {openImage && (
          <Modal
            open={!!openImage}
            onClose={handleCloseModal}
            onClick={handleCloseModal}
            aria-labelledby="image-modal"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                maxWidth: "90%",
                maxHeight: "90vh",
                outline: "none",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: imageLoaded ? 1 : 0.3,
                  scale: imageLoaded ? 1 : 0.95,
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", duration: 0.3 }}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0.2)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "8px",
                  padding: "8px",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
                }}
              >
                <motion.img
                  src={openImage}
                  alt="Enlarged view"
                  onLoad={() => setImageLoaded(true)}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "85vh",
                    objectFit: "contain",
                    borderRadius: "4px",
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </Box>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};