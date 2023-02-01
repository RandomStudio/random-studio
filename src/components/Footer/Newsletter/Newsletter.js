import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Newsletter.module.css';

const Newsletter = ({ className }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleInput = e => setEmail(e.target.value);

  const handleSubmit = async event => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch(
        `https://staging.random.studio/.netlify/functions/addToNewsletterList?email=${email}`,
      );

      if (response.ok) {
        window.plausible?.('Newsletter Submission', {
          state: 'success',
        });

        setIsSuccessful(true);

        return;
      }

      const body = await response.json();

      window.plausible?.('Newsletter Submission', {
        state: 'error_mailchimp',
      });

      setError(body.error);
    } catch (responseError) {
      console.error(responseError);

      window.plausible?.('Newsletter Submission', {
        state: 'error_backend',
      });

      setError('Failed to submit to backend, sorry about that!');
    }
  };

  return (
    <form
      className={`${styles.container} ${className}`}
      onSubmit={handleSubmit}
    >
      <p className={styles.title}>{'Newsletter'}</p>

      {isSuccessful ? (
        <>
          <div className={styles.input}>{'Thank you!'}</div>

          <div className={styles.submit}>
            <img
              alt="success"
              className={styles.check}
              src="/icons/check.svg"
            />
          </div>
        </>
      ) : (
        <>
          <input
            className={styles.input}
            onChange={handleInput}
            placeholder="enter your email address"
            type="text"
            value={email}
          />

          <input
            alt="submit"
            className={styles.submit}
            src="/icons/arrow.svg"
            type="image"
          />

          {error && <p className={styles.error}>{error}</p>}
        </>
      )}
    </form>
  );
};

Newsletter.propTypes = {
  className: PropTypes.string,
};

Newsletter.defaultProps = {
  className: '',
};

export default Newsletter;
