import { useContext, useRef } from "react";
import { AppContext } from "../../utils/context/AppContext";
import copyStringToClipboard from "../../utils/copyStringToClipboard";
import PropTypes from 'prop-types';

const Email = ({ email }) => {
  const emailRef = useRef();
  const { setIsToastVisible } = useContext(AppContext);

  const handleClickEmail = event => {
    if (!matchMedia('(pointer:fine)').matches) {
      return;
    }
    copyStringToClipboard(event, email, setIsToastVisible);
  }

  return (
    <a
      aria-label="Email address"
      href={`mailto:${email}`}
      onClick={handleClickEmail}
      ref={emailRef}
    >
      {email}
    </a>
  )
}

Email.propTypes = {
  email: PropTypes.string,
}

Email.defaultProps = {
  email: 'hello@random.studio',
}

export default Email;
