import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './BackScrim.module.scss';
import supportsIntersectionObserver from '../../../utils/supportsIntersectionObserver';

const BackScrim = () => {
  const intersectionRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const { hasHistory } = router.query;

  const handleback = () => {
    if (hasHistory) {
      return router.back();
    }

    return router.push('/projects');
  };

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

  const visibilityClass = isVisible ? styles.isVisible : '';
  const scrimClassNames = `${styles.backScrim} ${visibilityClass}`;

  return (
    <>
      <div className={scrimClassNames}>
        <button className={styles.backButton} onClick={() => handleback()}>
          {'Back to projects'}
        </button>
      </div>

      <div className={styles.intersectionLine} ref={intersectionRef} />
    </>
  );
};

export default BackScrim;
