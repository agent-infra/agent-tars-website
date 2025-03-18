import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { FiDownload } from 'react-icons/fi';
import { FaTwitter } from 'react-icons/fa';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold text-white">
            Agent TARS
          </Link>
          <div className="flex items-center gap-6">
            <Link 
              to="/blog" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Blog
            </Link>
            <Link 
              to="/showcase" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Showcase
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            as="a"
            href="https://x.com/AgentTars"
            target="_blank"
            className="min-w-[40px] w-[40px] h-[40px] p-0 bg-transparent border border-white/20 hover:bg-white/10"
            isIconOnly
          >
            <FaTwitter className="text-white" />
          </Button>
          <Button
            as="a"
            href="https://github.com/bytedance/UI-TARS-desktop/releases"
            target="_blank"
            className="
              bg-gradient-to-r from-[#6D28D9] to-[#7C3AED]
              hover:from-[#5B21B6] hover:to-[#6D28D9]
              text-white font-medium px-5 py-2 rounded-full
              shadow-[0_0_15px_rgba(124,58,237,0.2)]
              border border-white/10
              backdrop-blur-sm
              transition-all duration-300
              hover:shadow-[0_0_20px_rgba(124,58,237,0.25)]
              hover:scale-105
              active:scale-95
              group
            "
            startContent={
              <FiDownload className="text-lg mr-1 group-hover:scale-110 transition-transform duration-300" />
            }
          >
            Download
          </Button>
        </div>
      </div>
    </nav>
  );
};