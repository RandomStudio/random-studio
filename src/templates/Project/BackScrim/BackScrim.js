import React, { useEffect, useRef, useState } from 'react';
import { Link, withPrefix } from 'gatsby';
import PropTypes from 'prop-types';
import styles from './BackScrim.module.scss';

const BackScrim = ({ returnUrl }) => {
  const intersectionRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  const returnUrlWithPrefix = withPrefix(`/${returnUrl}`);

  useEffect(() => {
    const intersection = intersectionRef.current;
    let observer = null;
    const supportsIntersectionObserver = 'IntersectionObserver' in window
      || ('IntersectionObserverEntry' in window
        && 'isIntersecting' in window.IntersectionObserverEntry.prototype);

    const onScroll = () => {
      const hasScrolledToBottom = window.innerHeight
        + window.pageYOffset >= document.body.offsetHeight;
      setIsVisible(hasScrolledToBottom);
    };

    if (supportsIntersectionObserver) {
      window.addEventListener('scroll', onScroll);
    } else {
      const intersectCb = sentinel => setIsVisible(sentinel.isIntersecting);
      observer = new IntersectionObserver(entries => intersectCb(entries[0]));
      observer.observe(intersection);
    }

    return () => {
      if (observer) {
        observer.unobserve(intersection);
        observer.disconnect();
      }

      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrimClassNames = `${styles.backScrim} ${
    isVisible && styles.isVisible
  }`;

  return (
    <>
      <div className={scrimClassNames}>
        <Link to={returnUrlWithPrefix} className={styles.backButton}>
          {'Back to projects'}
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
