import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { motion } from "framer-motion";
import { Spinner, Button } from "@nextui-org/react";
import { FaBug } from "react-icons/fa";

const Docs: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/bytedance/UI-TARS-desktop/refs/heads/main/apps/agent-tars/docs/quick-start.md"
        );
        const text = await response.text();
        setMarkdown(text);
      } catch (error) {
        console.error("Failed to fetch markdown:", error);
        setMarkdown("# Error\nFailed to load documentation.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkdown();
  }, []);

  return (
    <div className="min-h-screen pt-24 px-4 pb-16 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button
            as="a"
            href="https://github.com/bytedance/UI-TARS-desktop/issues"
            target="_blank"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 transition-opacity"
            startContent={<FaBug className="text-sm" />}
            size="sm"
          >
            Report Issue
          </Button>
        </div>

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
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    className="text-4xl font-bold mb-6 pb-2 border-b border-white/10 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    className="text-3xl font-bold mt-12 mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className="text-2xl font-semibold mt-8 mb-3 text-white/90"
                    {...props}
                  />
                ),
                h4: ({ node, ...props }) => (
                  <h4
                    className="text-xl font-semibold mt-6 mb-2 text-white/80"
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    className="my-4 text-gray-300 leading-relaxed"
                    {...props}
                  />
                ),
                a: ({ node, ...props }) => (
                  <a
                    className="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul
                    className="my-4 list-disc pl-6 text-gray-300"
                    {...props}
                  />
                ),
                ol: ({ node, ...props }) => (
                  <ol
                    className="my-4 list-decimal pl-6 text-gray-300"
                    {...props}
                  />
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
                        className="bg-white/10 text-purple-300 px-1.5 py-0.5 rounded text-sm font-mono" 
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }

                  const match = /language-(\w+)/.exec(className || "");

                  if (match) {
                    return (
                      <div className="relative my-6">
                        <div className="absolute top-0 right-0 bg-white/10 rounded-bl rounded-tr px-2 py-1 text-xs text-gray-400 font-mono">
                          {match[1] || "code"}
                        </div>
                        <pre className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg p-4 overflow-x-auto text-gray-300 text-sm font-mono">
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
                  <tr
                    className="hover:bg-white/5 transition-colors"
                    {...props}
                  />
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
              {markdown}
            </ReactMarkdown>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Docs;