import { useEffect, useState } from 'react';

const useInView = (target, options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [observer, setObserver] = useState(null);

  useEffect(() => {
    const handleIntersect = entries => {
      setIsIntersecting(entries[0].isIntersecting);
    };

    observer?.disconnect();

    if (target.current) {
      const newObserver = new IntersectionObserver(handleIntersect, options);
      newObserver.observe(target.current);
      setObserver(newObserver);
    }
  }, [target.current, options.root, options.rootMargin, options.threshold]); // eslint-disable-line

  useEffect(() => {
    return () => {
      observer?.disconnect();
    };
  }, []); // eslint-disable-line

  return isIntersecting;
};

export default useInView;
