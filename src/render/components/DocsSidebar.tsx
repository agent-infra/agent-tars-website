import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { availableDocs, getDocsByCategory } from "../../docs";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@nextui-org/react";
import { FiMenu, FiX, FiChevronRight, FiChevronDown } from "react-icons/fi";

export const DocsSidebar: React.FC = () => {
  const { docId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  const [isMobile, setIsMobile] = useState(false);
  const currentDocId = docId || "quick-start";
  const docsByCategory = getDocsByCategory();

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Auto-expand the category containing the current doc
  useEffect(() => {
    const newExpandedCategories = { ...expandedCategories };

    Object.entries(docsByCategory).forEach(([category, docs]) => {
      if (docs.some((doc) => doc.id === currentDocId)) {
        newExpandedCategories[category] = true;
      }
    });

    setExpandedCategories(newExpandedCategories);
  }, [currentDocId]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const sidebarWidth = isOpen ? "w-64" : "w-16";

  return (
    <>
      {/* Mobile menu button - fixed position */}
      {isMobile && (
        <Button
          isIconOnly
          className="fixed left-4 top-20 z-40 bg-purple-600 text-white shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </Button>
      )}

      {/* Desktop collapsed sidebar button */}
      {!isMobile && !isOpen && (
        <div
          className="fixed left-0 top-16 bottom-0 w-16 bg-black/30 border-r border-white/10 flex flex-col items-center pt-4 z-30"
          onClick={() => setIsOpen(true)}
        >
          <Button
            isIconOnly
            className="bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 mb-8"
            onClick={() => setIsOpen(true)}
          >
            <FiMenu />
          </Button>
        </div>
      )}

      {/* Sidebar overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main sidebar */}
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.div
            initial={isMobile ? { x: -300 } : { width: "64px" }}
            animate={
              isOpen
                ? { x: 0, width: "256px" }
                : isMobile
                ? { x: -300 }
                : { width: "64px" }
            }
            exit={isMobile ? { x: -300 } : { width: "64px" }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
            className={`${
              isMobile ? "fixed left-0 top-16 bottom-0 z-30" : "relative"
            } border-r border-white/10 h-full overflow-y-auto bg-black/30`}
          >
            <div className={`p-4 ${isOpen ? "" : "items-center"}`}>
              {isOpen && (
                <div className="flex justify-between items-center mb-4">
                  {!isMobile && (
                    <Button
                      isIconOnly
                      size="sm"
                      className="bg-transparent text-gray-400 hover:bg-white/10 ml-auto"
                      onClick={() => setIsOpen(false)}
                    >
                      <FiX />
                    </Button>
                  )}
                </div>
              )}

              {Object.entries(docsByCategory).map(([category, docs]) => (
                <div key={category} className="mb-6">
                  {isOpen ? (
                    <>
                      <div
                        className="flex justify-between items-center px-3 py-2 cursor-pointer hover:bg-white/5 rounded-md"
                        onClick={() => toggleCategory(category)}
                      >
                        <h4 className="text-xs uppercase tracking-wider text-gray-500 font-medium">
                          {category}
                        </h4>
                        {expandedCategories[category] ? (
                          <FiChevronDown className="text-gray-500" />
                        ) : (
                          <FiChevronRight className="text-gray-500" />
                        )}
                      </div>

                      <AnimatePresence>
                        {expandedCategories[category] && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            {docs.map((doc) => (
                              <li key={doc.id}>
                                <Link
                                  to={`/${doc.id}`}
                                  className={`
                                    block px-3 py-2 rounded-md transition-colors text-sm
                                    ${
                                      currentDocId === doc.id
                                        ? "bg-purple-500/20 text-white font-medium"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    }
                                  `}
                                  onClick={() => isMobile && setIsOpen(false)}
                                >
                                  {doc.title}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};