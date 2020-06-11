/* eslint-disable import/prefer-default-export */
import { useCallback, useState } from 'react';

export const useToastVisibility = () => {
  const [isToastVisible, setIsVisible] = useState(false);

  const setIsToastVisible = useCallback(isVisible => {
    setIsVisible(isVisible);
  });

  return {
    isToastVisible,
    setIsToastVisible,
  };
};
