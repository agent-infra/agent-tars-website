import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { FiList } from "react-icons/fi";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  markdown: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ markdown }) => {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Extract headings from markdown
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const matches = [...markdown.matchAll(headingRegex)];
    
    const tocItems: TOCItem[] = matches.map((match, index) => {
      const level = match[1].length;
      const text = match[2];
      const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
      
      return {
        id,
        text,
        level
      };
    });
    
    setItems(tocItems);
  }, [markdown]);

  if (items.length === 0) return null;

  return (
    <div className="relative">
      <Button
        isIconOnly
        className="bg-white/10 hover:bg-white/20"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiList className="text-white" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl p-4 z-50">
          <h4 className="text-sm font-medium text-white/70 mb-2">Table of Contents</h4>
          <ul className="space-y-1">
            {items.map((item, index) => (
              <li 
                key={index}
                style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
              >
                <a
                  href={`#${item.id}`}
                  className="text-sm text-purple-400 hover:text-purple-300 block py-1"
                  onClick={() => setIsOpen(false)}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
