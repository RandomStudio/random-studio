import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './BackScrim.module.scss';
import supportsIntersectionObserver from '../../../utils/supportsIntersectionObserver';

const BackScrim = () => {
  const intersectionRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!supportsIntersectionObserver) {
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

  const scrimClassNames = `${styles.backScrim} ${
    isVisible && styles.isVisible
  }`;

  return (
    <>
      <div className={scrimClassNames}>
        <Link href="/projects">
          <a className={styles.backButton}>{'Back to projects'}</a>
        </Link>
      </div>
      <div className={styles.intersectionLine} ref={intersectionRef} />
    </>
  );
};

export default BackScrim;
