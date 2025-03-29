import React from "react";
import { motion } from "framer-motion";
import { Spinner } from "@nextui-org/react";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { TableOfContents } from "./TableOfContents";

interface MarkdownContentProps {
  markdown: string;
  isLoading: boolean;
  contentKey?: string;
  publishDate?: string;
  author?: string;
  className?: string;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({
  markdown,
  isLoading,
  contentKey,
  publishDate,
  author,
  className = "prose-lg prose-invert max-w-none",
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Main content column with width constraint */}
      <div className="md:flex-1 md:max-w-[75%]">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="lg" color="white" />
          </div>
        ) : (
          <motion.div
            key={contentKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="markdown-body bg-transparent text-white mb-16"
          >
            <MarkdownRenderer
              content={markdown}
              publishDate={publishDate}
              author={author}
              className={className}
            />
          </motion.div>
        )}
      </div>

      {/* Table of contents column - only show when not loading */}
      {!isLoading && (
        <div className="md:w-[23%] md:min-w-[200px] flex-shrink-0">
          <TableOfContents markdown={markdown} />
        </div>
      )}
    </div>
  );
};
