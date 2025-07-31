import { useEffect, useRef, useState } from 'react';
import styles from './FloatingMenu.module.css';

type MenuOption = {
  label: string;
  id: string;
};

const FloatingMenu = () => {
  const [menuOptions, setMenuOptions] = useState<MenuOption[]>([]);
  const [activeOption, setActiveOption] = useState<MenuOption | null>(null);

  const [isExpanded, setIsExpanded] = useState(false);

  const isNavigatingToClickedLinkRef = useRef(false);
  useEffect(() => {
    const sectionAnchorsOnPage = Array.from(document.querySelectorAll('section[id]'));
    const newMenuOptions = sectionAnchorsOnPage.map(section => ({
      label: section.getAttribute('aria-label') || section.id,
      id: section.id,
    }));
    setMenuOptions(newMenuOptions);

    const handleScroll = () => {
      if (isNavigatingToClickedLinkRef.current) {
        return;
      }
      const yOffsets = sectionAnchorsOnPage.map(section => ({
        id: section.id,
        offsetTop: section.getBoundingClientRect().top + window.scrollY,
      }));
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const closestSection = yOffsets.reduce((prev, curr) => {
        return Math.abs(curr.offsetTop - scrollPosition) < Math.abs(prev.offsetTop - scrollPosition) ? curr : prev;
      });
      setActiveOption(newMenuOptions.find(option => option.id === closestSection.id) || null);
      setIsExpanded(false); // Collapse the menu on scroll
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleOptionClick = (option: MenuOption) => {
    setActiveOption(option);
    setIsExpanded(false);
    isNavigatingToClickedLinkRef.current = true;
    const anchor = document.getElementById(option.id);
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => {
      isNavigatingToClickedLinkRef.current = false;
    }, 1000);
  }


  if (!menuOptions.length) {
    return null;
  }

  return (
    <nav className={`${styles.floatingMenu} ${isExpanded ? styles.isExpanded : ''}`} onClick={() => setIsExpanded(!isExpanded)}>
      {menuOptions.map(option => (
        <li
          key={option.id}
          className={activeOption?.id === option.id ? styles.active : ''}
          onClick={() => handleOptionClick(option)}
        >
          {option.label}
        </li>
      ))}
      <span className={styles.activeOption}>{activeOption?.label}</span>
    </nav>
  )
}

export default FloatingMenu;
