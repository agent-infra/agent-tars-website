import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Spinner, Button } from "@nextui-org/react";
import { FaBug } from "react-icons/fa";
import { MarkdownRenderer } from "../components/MarkdownRenderer";

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
            <MarkdownRenderer content={markdown} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Docs;
