import React from "react";
// ... 保留现有导入 ...

export const DocContent: React.FC<DocContentProps> = ({ 
  title, 
  author, 
  date, 
  children 
}) => {
  return (
    <div className="doc-content">
      <div className="doc-header mb-8">  {/* 增加了 mb-8 来增加底部边距 */}
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        {(author || date) && (
          <div className="text-gray-400 text-sm">
            {date && <span>Published: {date}</span>}
            {author && date && <span> • </span>}
            {author && <span>By: {author}</span>}
          </div>
        )}
      </div>
      
      <div className="doc-body">
        {children}
      </div>
    </div>
  );
};