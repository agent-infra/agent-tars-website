import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { Link } from "react-router-dom";

interface MarkdownRendererProps {
  content: string;
  publishDate?: string;
  author?: string;
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
    window.history.pushState(null, '', `#${id}`);
    
    // Scroll to target element
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={(e) => {
        e.preventDefault();
        handleCopyLink();
      }}>
        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
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
}) => {
  // Handle hash navigation on page load
  React.useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        // Use setTimeout to ensure page is fully rendered before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [content]); // Re-check when content changes

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
      components={{
        h1: ({ node, children, ...props }) => {
          // Generate ID from heading text for anchor links
          const id = children
            ?.toString()
            .toLowerCase()
            .replace(/[^\w\s]/g, "")
            .replace(/\s+/g, "-");
          return (
            <>
              <h1
                id={id}
                className="group text-4xl font-bold mb-2 pb-2 border-b border-white/10 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent scroll-mt-20 flex items-center"
                {...props}
              >
                {children}
                {id && <HeaderAnchor id={id} />}
              </h1>
              {/* Display metadata if available */}
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
              className="group text-3xl font-bold mt-12 mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent scroll-mt-20 flex items-center"
              {...props}
            >
              {children}
              {id && <HeaderAnchor id={id} />}
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
              className="group text-2xl font-semibold mt-8 mb-3 text-white/90 scroll-mt-20 flex items-center"
              {...props}
            >
              {children}
              {id && <HeaderAnchor id={id} />}
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
              className="group text-xl font-semibold mt-6 mb-2 text-white/80 scroll-mt-20 flex items-center"
              {...props}
            >
              {children}
              {id && <HeaderAnchor id={id} />}
            </h4>
          );
        },
        p: ({ node, ...props }) => (
          <p className="my-4 text-gray-300 leading-relaxed" {...props} />
        ),
        a: ({ node, href, ...props }) => {
          // Handle three types of links:
          // 1. Hash links (#section)
          // 2. Internal path links (/path)
          // 3. External links (https://...)
          
          if (href && href.startsWith('#')) {
            // Hash links - use smooth scrolling
            return (
              <a
                href={href}
                className="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2"
                onClick={(e) => {
                  e.preventDefault();
                  // Find target element and scroll into view
                  const element = document.getElementById(href.substring(1));
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    // Update URL without page reload
                    window.history.pushState(null, '', href);
                  }
                }}
                {...props}
              />
            );
          } else if (href && !href.match(/^(https?:)?\/\//) && href.startsWith('/')) {
            // Internal links - use React Router's Link
            return (
              <Link
                to={href}
                className="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2"
                {...props}
              />
            );
          }
          
          // External links - open in new tab
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
          // Inline code (no language specified)
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

          // Code blocks with language highlighting
          const match = /language-(\w+)/.exec(className || "");
          const [isWordWrap, setIsWordWrap] = useState(true);
          const [isCopied, setIsCopied] = useState(false);

          const handleCopy = () => {
            const code = children?.toString() || "";
            navigator.clipboard.writeText(code).then(() => {
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 2000);
            });
          };

          const toggleWordWrap = () => {
            setIsWordWrap(!isWordWrap);
          };

          if (match) {
            return (
              <div className="relative my-6">
                {/* Code block header with actions */}
                <div className="flex items-center justify-between bg-gray-800 rounded-t-lg border-t border-l border-r border-gray-700 px-4 py-2">
                  {/* Language badge */}
                  <div className="text-xs text-gray-400 font-mono">
                    {match[1] || "code"}
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex items-center gap-2">
                    {/* Word wrap toggle button */}
                    <button 
                      onClick={toggleWordWrap}
                      className="hover:bg-gray-700 transition-colors rounded-sm px-2 py-1 text-xs text-gray-400"
                      title={isWordWrap ? "Disable word wrap" : "Enable word wrap"}
                    >
                      {isWordWrap ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h12A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 1 12.5v-9zM2.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-12z"/>
                          <path d="M13 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H14v6.5a.5.5 0 0 1-1 0V5.5z"/>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h12A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 1 12.5v-9zM2.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-12z"/>
                          <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H12v3.5a.5.5 0 0 1-1 0V5.5z"/>
                        </svg>
                      )}
                    </button>
                    
                    {/* Copy button */}
                    <button
                      onClick={handleCopy}
                      className="hover:bg-gray-700 transition-colors rounded-sm px-2 py-1 text-xs text-gray-400 flex items-center gap-1"
                      title="Copy code"
                    >
                      {isCopied ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                          </svg>
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                          </svg>
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <pre className={`bg-gray-900 border-b border-l border-r border-gray-700 rounded-b-lg py-4 px-4 text-gray-300 text-sm font-mono ${isWordWrap ? 'whitespace-pre-wrap break-words' : 'overflow-x-auto'}`}>
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
        thead: ({ node, ...props }) => (
          <thead className="bg-white/5" {...props} />
        ),
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
          <td
            className="px-4 py-3 whitespace-nowrap text-gray-400 border-white/10"
            {...props}
          />
        ),
        img: ({ node, ...props }) => (
          <img
            className="max-w-full h-auto my-6 rounded-lg border border-white/10 shadow-lg"
            {...props}
            alt={props.alt || "Documentation image"}
          />
        ),
        hr: ({ node, ...props }) => (
          <hr className="my-8 border-t border-white/10" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};