import React, { useState } from 'react';
import styles from './Newsletter.module.scss';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleInput = (e) => setEmail(e.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await fetch(
        `/.netlify/functions/addToNewsletterList?email=${email}`,
      );

      if (response.ok) {
        setIsSuccessful(true);
      } else {
        const body = await response.json();
        setError(body.errorMessage);
      }
    } catch (error) {
      console.log(error);
      setError('Failed to submit. Please check email and try again.');
    }
    return false;
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <p className={styles.title}>Newsletter</p>
      {isSuccessful ? (
        <>
          <div className={styles.input}>Thank you!</div>
          <div className={styles.submit}>
            <img
              alt="success"
              className={styles.check}
              src="/img/icons/check.svg"
            />
          </div>
        </>
      ) : (
        <>
          <input
            className={styles.input}
            onChange={handleInput}
            placeholder="enter your email address"
            value={email}
            type="text"
          />
          <input
            alt="submit"
            className={styles.submit}
            src="/img/icons/arrow.svg"
            type="image"
          />
          {error !== '' && <p className={styles.error}>{error}</p>}
        </>
      )}
    </form>
  );
};

export default Newsletter;
