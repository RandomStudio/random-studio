import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import copyStringToClipboard from '../../../../utils/copyStringToClipboard';
import Toast from './Toast/Toast';

const Email = ({ className, email }) => {
  const emailRef = useRef();
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleClickEmail = event => {
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

      <Toast isVisible={isToastVisible} setIsToastVisible={setIsToastVisible} />
    </>
  );
};

Email.propTypes = {
  email: PropTypes.string,
};

Email.defaultProps = {
  email: 'hello@random.studio',
};

export default Email;
