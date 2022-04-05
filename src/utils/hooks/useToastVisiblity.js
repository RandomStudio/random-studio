import { useCallback, useState } from 'react';

const useToastVisibility = () => {
  const [isToastVisible, setIsVisible] = useState(false);

  const setIsToastVisible = useCallback(isVisible => {
    setIsVisible(isVisible);
  }, []);

  return {
    isToastVisible,
    setIsToastVisible,
  };
};

export default useToastVisibility;
