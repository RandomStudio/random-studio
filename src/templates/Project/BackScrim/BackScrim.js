import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styles from './BackScrim.module.scss';

const BackScrim = ({ returnUrl }) => {
  const intersectionRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const intersection = intersectionRef.current;

    const intersectCb = sentinel => setIsVisible(sentinel.isIntersecting);

    const observer = new IntersectionObserver(entries => intersectCb(entries[0]));
    observer.observe(intersection);

    return () => {
      observer.unobserve(intersection);
      observer.disconnect();
    };
  }, [setIsVisible]);

  const scrimClassNames = `${styles.backScrim} ${isVisible && styles.isVisible}`;

  return (
    <>
      <div className={scrimClassNames}>
        <Link to={returnUrl} className={styles.backButton}>
          Back to projects
        </Link>
      </div>
      <div ref={intersectionRef} className={styles.intersectionLine} />
    </>
  );
};

BackScrim.propTypes = {
  returnUrl: PropTypes.string.isRequired,
};

export default BackScrim;
