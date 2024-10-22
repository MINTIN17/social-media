import React, { useState, ReactNode, useEffect } from 'react';

type HoverDivProps = {
  hoverText: string;  // Nội dung text hiển thị khi hover
  children: ReactNode; // Nội dung chính của component (div hoặc bất kỳ element nào)
};

const HoverDiv: React.FC<HoverDivProps> = ({ hoverText, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showHoverText, setShowHoverText] = useState(false); // Trạng thái để quản lý hiển thị sau 0.3s

  const handleMouseEnter = () => {
    setIsHovered(true);

    // Đặt timeout để hiển thị div sau 0.3 giây
    setTimeout(() => {
      setShowHoverText(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    // Khi không hover nữa, ẩn div ngay lập tức
    setShowHoverText(false);
  };

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
      {/* Nội dung chính */}
      {children}

      {/* Hiển thị khi hover với delay 0.3s */}
      {isHovered && showHoverText && (
        <div
          style={{
            position: 'absolute',
            top: '100%',    // Vị trí ngay dưới phần tử chính
            left: '50%',    // Canh giữa theo chiều ngang
            transform: 'translateX(-50%)', // Dịch chuyển để căn giữa hoàn toàn
            marginTop: '10px', // Khoảng cách 10px bên dưới phần tử chính
            backgroundColor: '#b9b4aa',
            color:"#505050",
            padding: '10px',
            textAlign: 'center',
            whiteSpace: 'nowrap', // Không cho xuống dòng
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
