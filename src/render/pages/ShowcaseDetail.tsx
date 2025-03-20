import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Spinner } from "@nextui-org/react";
import { FiArrowLeft, FiShare2, FiX, FiMaximize2 } from "react-icons/fi";
import { showcaseItems, ShowcaseItem } from '../../data/showcaseData';
import { BrowserShell } from '../components/BrowserShell';
import { ShareModal } from '../components/ShareModal';

const ShowcaseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<ShowcaseItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    // Find the showcase item by ID
    const showcaseItem = showcaseItems.find(item => item.id === id);
    
    if (showcaseItem) {
      setItem(showcaseItem);
    } else {
      // If item not found, redirect to showcase page
      navigate('/showcase', { replace: true });
    }
    
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, [id, navigate]);

  const handleExpandView = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  if (!item) {
    return (
      <div className="min-h-screen pt-24 flex justify-center items-center">
        <Spinner size="lg" color="white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-16 bg-black text-white">
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              className="w-[90%] h-[90%] max-w-7xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onClick={handleClose}
                  className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20"
                >
                  <FiX size={18} />
                </Button>
              </div>

              <div className="h-[calc(100%-40px)]">
                <BrowserShell
                  url={item.link}
                  loading={isLoading}
                  title={item.title}
                  onShare={() => setIsShareModalOpen(true)}
                  onClose={handleClose}
                >
                  <iframe 
                    src={item.link}
                    className="w-full h-full"
                    title={item.title}
                    frameBorder="0"
                    style={{ 
                      borderRadius: '0 0 12px 12px',
                      backgroundColor: '#fff'
                    }}
                    onLoad={() => setIsLoading(false)}
                  />
                </BrowserShell>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="light"
            color="default"
            startContent={<FiArrowLeft />}
            onClick={() => navigate('/showcase')}
            className="text-white"
          >
            Back to Showcase
          </Button>
          
          <div className="flex items-center gap-2">
            <Button
              variant="flat"
              color="default"
              startContent={<FiMaximize2 />}
              onClick={handleExpandView}
              className="bg-white/10 text-white hover:bg-white/20"
            >
              Focus View
            </Button>
            
            <Button
              variant="flat"
              color="default"
              startContent={<FiShare2 />}
              onClick={() => setIsShareModalOpen(true)}
              className="bg-white/10 text-white"
            >
              Share
            </Button>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            {item.title}
          </h1>
          <p className="text-gray-400">{item.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-sm px-2 py-1 rounded-full bg-white/10 text-purple-300">
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </span>
            {item.date && (
              <span className="text-sm px-2 py-1 rounded-full bg-white/10 text-gray-300">
                {item.date}
              </span>
            )}
            {item.languages?.map((language, i) => (
              <span
                key={i}
                className="text-sm px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30"
              >
                {language}
              </span>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isExpanded ? 0 : 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative h-[calc(100vh-220px)] min-h-[500px]"
        >
          <BrowserShell
            url={item.link}
            loading={isLoading}
            title={item.title}
            onShare={() => setIsShareModalOpen(true)}
          >
            <iframe 
              src={item.link}
              className="w-full h-full"
              title={item.title}
              frameBorder="0"
              style={{ 
                borderRadius: '0 0 12px 12px',
                backgroundColor: '#fff'
              }}
              onLoad={() => setIsLoading(false)}
            />
          </BrowserShell>
        </motion.div>
      </div>
      
      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        item={item}
      />
    </div>
  );
};

export default ShowcaseDetail;
