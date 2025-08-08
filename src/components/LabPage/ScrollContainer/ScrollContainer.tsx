import { useLayoutEffect, useRef, useState } from 'react';
import styles from './ScrollContainer.module.css';

type ScrollContainerProps = {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
};

const ScrollContainer = ({ children, className }: ScrollContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = useState(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const checkScroll = () => {
      setHasScroll(container.scrollHeight > container.clientHeight);
    };

    checkScroll();

    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(container);

    const mutationObserver = new MutationObserver(checkScroll);
    mutationObserver.observe(container, { childList: true, subtree: true });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <div className={`${styles.scrollContainer} ${className} ${hasScroll ? styles.hasScroll : ''}`} ref={containerRef}>
      {children}
    </div>
  )
}

export default ScrollContainer;
