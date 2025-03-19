import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Spinner } from "@nextui-org/react";
import { ShowcaseCard } from '../components/ShowcaseCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { ShowcaseHeader } from '../components/ShowcaseHeader';
import { ShowcasePreview } from '../components/ShowcasePreview';
import { ShareModal } from '../components/ShareModal';
import { 
  showcaseItems, 
  getItemsByCategory, 
  getCategoriesWithCounts,
  ShowcaseItem
} from '../../data/showcaseData';

const Showcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredItems, setFilteredItems] = useState(showcaseItems);
  const [isLoading, setIsLoading] = useState(true);
  const [previewItem, setPreviewItem] = useState<ShowcaseItem | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [shareItem, setShareItem] = useState<ShowcaseItem | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const categoriesWithCounts = getCategoriesWithCounts();

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      setFilteredItems(getItemsByCategory(activeCategory));
      setIsLoading(false);
    }, 600);
  }, [activeCategory]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleOpenPreview = (item: ShowcaseItem) => {
    setPreviewItem(item);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };
  
  const handleShareItem = (item: ShowcaseItem) => {
    setShareItem(item);
    setIsShareModalOpen(true);
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-16 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <ShowcaseHeader 
          title="Showcase"
          description="Explore our collection of impressive demos and applications"
        />

        <CategoryFilter 
          categories={categoriesWithCounts}
          activeCategory={activeCategory}
          onSelectCategory={handleCategoryChange}
        />

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Spinner size="lg" color="white" />
            </motion.div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredItems.map((item, index) => (
                  <ShowcaseCard 
                    key={item.id} 
                    item={item} 
                    index={index} 
                    onOpenPreview={handleOpenPreview}
                    onShareItem={handleShareItem}
                  />
                ))}
              </div>
              
              {filteredItems.length === 0 && (
                <motion.div 
                  className="text-center py-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-gray-400 text-lg">No items found in this category.</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
        
        <motion.div
          className="mt-16 pt-8 border-t border-white/10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-gray-500">
            Want to showcase your project? <a href="#" className="text-purple-400 hover:text-purple-300 underline">Contact us</a>
          </p>
        </motion.div>
      </div>

      {/* Showcase Preview Modal */}
      <ShowcasePreview 
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        item={previewItem}
        onShare={handleShareItem}
      />
      
      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        item={shareItem}
      />
    </div>
  );
};

export default Showcase;
