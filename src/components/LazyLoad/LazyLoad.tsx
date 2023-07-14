import React, { useEffect, useRef, useState } from 'react';

const LazyLoad = ({ children, onIntersect }) => {
  const ref = useRef(null);

  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    let currentRef = ref.current;

    if (!currentRef || hasIntersected) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setHasIntersected(true);
            observer.disconnect();

            if (onIntersect) {
              onIntersect();
            }
          }
        });
      },
      {
        rootMargin: '8%',
      },
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      setHasIntersected(false)
      observer.disconnect();
    };
  }, [ref]);

  return (
    <div ref={ref}>
      {children}
    </div>
  );
}

export default LazyLoad;
