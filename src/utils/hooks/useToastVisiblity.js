import { useState } from 'react';

const useToastVisibility = () => {
  const [isToastVisible, setIsToastVisible] = useState(false);

  return {
    isToastVisible,
    setIsToastVisible,
  };
};

export default useToastVisibility;
