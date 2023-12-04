import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './BackScrim.module.scss';
import supportsIntersectionObserver from '../../../utils/supportsIntersectionObserver';

const BackScrim = () => {
  const intersectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!supportsIntersectionObserver || !intersectionRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(entries =>
      setIsVisible(entries[0].isIntersecting),
    );

    observer.observe(intersectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const visibilityClass = isVisible ? styles.isVisible : '';
  const scrimClassNames = `${styles.backScrim} ${visibilityClass}`;

  return (
    <>
      <div className={scrimClassNames}>
        <Link className={styles.backButton} href="/projects">
          {'Back to projects'}
        </Link>
      </div>

      <div className={styles.intersectionLine} ref={intersectionRef} />
    </>
  );
};

export default BackScrim;
