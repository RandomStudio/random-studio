import React, { useEffect, useRef, useState } from 'react';

type LazyLoadProps = {
  children: JSX.Element;
  onIntersect?: () => void;
};

const LazyLoad = ({ children, onIntersect = () => null }: LazyLoadProps) => {
  const ref = useRef(null);

  const [hasIntersected, setHasIntersected] = useState(false);

  const onIntersectFuncRef = useRef(onIntersect);

  useEffect(() => {
    if (hasIntersected) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setHasIntersected(true);
            observer.disconnect();

            onIntersectFuncRef.current?.();
          }
        });
      },
      {
        rootMargin: '8%',
      },
    );

    const currentRef = ref.current;
    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }

      observer.disconnect();
    };
  }, [hasIntersected, ref]);

  if (hasIntersected) {
    return children;
  }

  return <div ref={ref}>{children}</div>;
};

export default LazyLoad;
