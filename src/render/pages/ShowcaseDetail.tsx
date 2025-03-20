import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Spinner, Chip, Tooltip, Avatar } from "@nextui-org/react";
import { FiArrowLeft, FiShare2, FiX, FiMaximize2, FiExternalLink, FiInfo } from "react-icons/fi";
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
    <div className="min-h-screen pt-20 bg-black text-white">
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

      <div className="max-w-[95%] mx-auto px-4 pb-16">
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
        </div>
        
        {/* New left-right layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Browser preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isExpanded ? 0 : 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-3/4 relative h-[calc(100vh-220px)] min-h-[500px]"
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
          
          {/* Right side - Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/4 lg:sticky lg:top-24 lg:self-start"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h1 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                {item.title}
              </h1>
              
              <p className="text-gray-400 mb-5 text-sm">{item.description}</p>
              
              <div className="space-y-5">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm px-3 py-1 rounded-full bg-white/10 text-purple-300">
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                  </span>
                  
                  {item.date && (
                    <span className="text-xs text-gray-400">{item.date}</span>
                  )}
                </div>
                
                {item.author && (
                  <div className="flex items-center gap-3 py-2">
                    <Avatar
                      src={`https://github.com/${item.author.github}.png`}
                      alt={item.author.name}
                      className="w-10 h-10 border-2 border-white/20"
                    />
                    <div>
                      <p className="text-white text-sm font-medium">{item.author.name}</p>
                      <a 
                        href={`https://github.com/${item.author.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-400 hover:underline"
                      >
                        @{item.author.github}
                      </a>
                    </div>
                  </div>
                )}
                
                {item.languages && item.languages.length > 0 && (
                  <div>
                    <h3 className="text-xs uppercase text-gray-500 mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {item.languages.map((language, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {item.tags && item.tags.length > 0 && (
                  <div>
                    <h3 className="text-xs uppercase text-gray-500 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-1.5 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="pt-4">
                  <Button
                    startContent={<FiMaximize2 />}
                    className="bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] text-white w-full mb-3"
                    onClick={handleExpandView}
                  >
                    Focus View
                  </Button>
                  
                  <div className="flex gap-2">
                    <Tooltip content="Open in New Tab">
                      <Button
                        as="a"
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        isIconOnly
                        variant="flat"
                        color="default"
                        className="bg-white/10 text-white hover:bg-white/20 flex-1"
                      >
                        <FiExternalLink />
                      </Button>
                    </Tooltip>
                    
                    <Tooltip content="Share">
                      <Button
                        isIconOnly
                        variant="flat"
                        color="default"
                        onClick={() => setIsShareModalOpen(true)}
                        className="bg-white/10 text-white hover:bg-white/20 flex-1"
                      >
                        <FiShare2 />
                      </Button>
                    </Tooltip>
                    
                    <Tooltip content="More Info">
                      <Button
                        isIconOnly
                        variant="flat"
                        color="default"
                        className="bg-white/10 text-white hover:bg-white/20 flex-1"
                      >
                        <FiInfo />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
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