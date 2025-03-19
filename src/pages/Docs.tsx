import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Spinner, Button } from "@nextui-org/react";
import { FaBug } from "react-icons/fa";
import { MarkdownRenderer } from "../components/MarkdownRenderer";
import { useParams } from "react-router-dom";
import { availableDocs } from "../config/docsConfig";
import { DocsSidebar } from "../components/DocsSidebar";
import { TableOfContents } from "../components/TableOfContents";

const Docs: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { docId } = useParams();
  const currentDocId = docId || "quick-start";

  const currentDoc =
    availableDocs.find((doc) => doc.id === currentDocId) || availableDocs[0];

  useEffect(() => {
    const fetchMarkdown = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(currentDoc.githubPath);
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
  }, [currentDoc]);

  return (
    <div className="min-h-screen pt-16 bg-black text-white">
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <DocsSidebar />

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-6 mt-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                {/* {currentDoc.title} */}
              </h1>

              <div className="flex items-center gap-4">
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
                <TableOfContents markdown={markdown} />
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Spinner size="lg" color="white" />
              </div>
            ) : (
              <motion.div
                key={currentDocId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="markdown-body bg-transparent text-white mb-16"
              >
                <MarkdownRenderer 
                  content={markdown} 
                  publishDate={currentDoc.publishDate}
                  author={currentDoc.author}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;