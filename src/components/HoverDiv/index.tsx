import React, { useState, useRef, useEffect, ReactNode } from 'react';

type HoverDivProps = {
  hoverText: string;  // Nội dung hiển thị khi hover
  children: ReactNode; // Nội dung chính của component (div hoặc bất kỳ element nào)
};

const HoverDiv: React.FC<HoverDivProps> = ({ hoverText, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showHoverText, setShowHoverText] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);

    // Xóa timeout trước đó để tránh trùng lặp
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }

    // Thiết lập timeout mới để hiển thị hover text
    hoverTimeout.current = setTimeout(() => {
      setShowHoverText(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    // Ẩn hover text ngay lập tức và xóa timeout
    setShowHoverText(false);
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
  };

  // Dọn dẹp khi component bị unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
      }
    };
  }, []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      {children}

      {isHovered && showHoverText && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginTop: '10px',
            backgroundColor: '#ffffff',
            color: "#505050",
            padding: '10px',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            borderRadius: '10px',
            fontSize: "14px",
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            opacity: isHovered ? 1 : 0, 
            transition: 'opacity 0.3s ease-in-out', 
          }}
        >
          {hoverText}
        </div>
      )}
    </div>
  );
};

export default HoverDiv;
