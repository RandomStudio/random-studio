import { useEffect } from 'react';

type LoaderProps = {
  onLoad: () => void;
};

const Loader = ({ onLoad }: LoaderProps) => {
  useEffect(() => {
    return () => onLoad();
  }, [onLoad]);

  return null;
};

export default Loader;
