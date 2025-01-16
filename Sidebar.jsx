import React, { useState } from 'react';
import { Home, BookOpen, MessageCircle, Menu, Search } from 'lucide-react';

const styles = {
  menuButton: {
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    cursor: 'pointer',
    zIndex: 1001,
    color: '#333',
    background: 'white',
    width: 'auto',
    borderRadius: '0 0 8px 0',
  },
  searchContainer: {
    position: 'fixed',
    top: '20px',
    left: '60px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#f9f9f9',
    padding: '8px 12px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    width: '200px',
    padding: '4px 8px',
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    left: '-240px',
    height: '100vh',
    width: '240px',
    backgroundColor: '#1a1a1a',
    transition: 'left 0.3s ease',
    paddingTop: '80px',
    zIndex: 1000,
  },
  sidebarVisible: {
    left: 0,
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    color: '#ffffff',
    textDecoration: 'none',
    transition: 'background-color 0.2s ease',
  },
  menuItemHover: {
    backgroundColor: '#2a2a2a',
  },
  iconContainer: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    marginLeft: '12px',
    whiteSpace: 'nowrap',
  },
  homeButton: {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#6200ea',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  homeButtonHover: {
    backgroundColor: '#4a00b4',
  },
};

const menuItems = [
  { icon: Home, text: '홈', path: '/' },
  { icon: BookOpen, text: '학습하기', path: '/learn' },
  { icon: MessageCircle, text: '커뮤니티', path: '/qna' },
];

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isHomeHovered, setIsHomeHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
      <>
        {/* 햄버거 메뉴 버튼 */}
        <div
            style={styles.menuButton}
            onMouseEnter={handleMouseEnter}
        >
          <Menu size={24} />
        </div>

        {/* 검색 기능 */}
        <div style={styles.searchContainer}>
          <Search size={20} />
          <input
              type="text"
              placeholder="검색어를 입력하세요"
              style={styles.searchInput}
          />
        </div>

        {/* 사이드바 메뉴 */}
        <div
            style={{
              ...styles.sidebar,
              ...(isVisible ? styles.sidebarVisible : {}),
            }}
            onMouseLeave={handleMouseLeave}
        >
          {menuItems.map((item, index) => (
              <a
                  key={index}
                  href={item.path}
                  style={{
                    ...styles.menuItem,
                    ...(hoveredItem === index ? styles.menuItemHover : {}),
                  }}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
              >
                <div style={styles.iconContainer}>
                  <item.icon size={20} />
                </div>
                <span style={styles.menuText}>{item.text}</span>
              </a>
          ))}
        </div>

        {/* 하단 홈 버튼 */}
        <div
            style={{
              ...styles.homeButton,
              ...(isHomeHovered ? styles.homeButtonHover : {}),
            }}
            onMouseEnter={() => setIsHomeHovered(true)}
            onMouseLeave={() => setIsHomeHovered(false)}
        >
          <Home size={24} />
        </div>
      </>
  );
};

export { Sidebar };
