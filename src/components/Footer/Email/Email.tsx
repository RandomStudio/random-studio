import React, { MouseEvent, useRef, useState } from 'react';
import copyStringToClipboard from '../../../utils/copyStringToClipboard';
import Toast from './Toast/Toast';

type EmailProps = {
  className?: string;
  email?: string;
};

const Email = ({
  className = '',
  email = 'hello@random.studio',
}: EmailProps) => {
  const emailRef = useRef<HTMLAnchorElement>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleClickEmail = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!matchMedia('(pointer:fine)').matches) {
      return;
    }

    copyStringToClipboard(event, email, setIsToastVisible);
  };

  return (
    <>
      <a
        aria-label="Email address"
        className={className}
        href={`mailto:${email}`}
        onClick={handleClickEmail}
        ref={emailRef}
      >
        {email}
      </a>

      <Toast isVisible={isToastVisible} />
    </>
  );
};

export default Email;
