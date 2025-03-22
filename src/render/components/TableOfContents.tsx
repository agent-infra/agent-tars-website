import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    // Extract headings from markdown
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const matches = [...markdown.matchAll(headingRegex)];
    
    const tocItems: TOCItem[] = matches.map((match) => {
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
    <div className="sticky top-4 ml-8 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 shadow-lg">
        <h4 className="text-sm font-medium text-white/70 mb-3">Table of Contents</h4>
        <ul className="space-y-1">
          {items.map((item, index) => (
            <li 
              key={index}
              style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
            >
              <a
                href={`#${item.id}`}
                className="text-sm text-gray-400 hover:text-white block py-1 transition-colors"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
