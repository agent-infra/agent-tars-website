import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
      components={{
        h1: ({ node, children, ...props }) => {
          const id = children?.toString().toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
          return (
            <h1
              id={id}
              className="text-4xl font-bold mb-6 pb-2 border-b border-white/10 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent scroll-mt-20"
              {...props}
            >
              {children}
            </h1>
          );
        },
        h2: ({ node, children, ...props }) => {
          const id = children?.toString().toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
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
          const id = children?.toString().toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
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
          const id = children?.toString().toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
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
      {content}
    </ReactMarkdown>
  );
};