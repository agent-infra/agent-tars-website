import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Spinner, Button } from "@nextui-org/react";
import { FaBug } from "react-icons/fa";
import { MarkdownRenderer } from "../components/MarkdownRenderer";
import { useParams } from "react-router-dom";
import { availableDocs, getLocalDoc } from "../../docs";
import { DocsSidebar } from "../components/DocsSidebar";
import { TableOfContents } from "../components/TableOfContents";
import { TwitterCardMeta } from "../components/TwitterCardMeta";
import { ETopRoute } from "../../constants/routes";

const Docs: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { docId } = useParams();
  const currentDocId = docId;

  const currentDoc =
    availableDocs.find((doc) => doc.id === currentDocId) || availableDocs[0];

  useEffect(() => {
    const fetchMarkdown = async () => {
      setIsLoading(true);

      try {
        // Check if we have a local version first
        if (currentDoc.localPath) {
          const localContent = getLocalDoc(currentDoc.localPath);

          if (localContent) {
            setMarkdown(localContent);
            setIsLoading(false);
            return;
          }
        }

        // Otherwise fetch from GitHub
        if (currentDoc.githubPath) {
          const response = await fetch(currentDoc.githubPath);
          const text = await response.text();
          setMarkdown(text);
        } else {
          setMarkdown(
            "# Document Not Found\nThe requested document could not be loaded."
          );
        }
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
    <>
      <TwitterCardMeta
        title={`${currentDoc.title} | Agent TARS Docs`}
        description="Agent TARS documentation and guides"
        url={`${window.location.origin}${ETopRoute.DOC}/${currentDocId}`}
      />

      <div className="min-h-screen pt-16 bg-black text-white">
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Sidebar */}
          <DocsSidebar />

          {/* Main content area with a two-column layout */}
          <div className="flex-1 overflow-y-auto p-6 mt-10">
            <div className="md:mx-20">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  {/* {currentDoc.title} */}
                </h1>

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

              <div className="flex flex-col md:flex-row gap-8">
                {/* Main content column with width constraint */}
                <div className="md:flex-1 md:max-w-[75%]">
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
                        className="prose-lg prose-invert max-w-none"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Docs;