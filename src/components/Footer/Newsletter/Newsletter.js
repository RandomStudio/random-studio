import React, { useState } from 'react';
import styles from './Newsletter.module.scss';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(true);

  const handleInput = e => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    try {
      const response = await fetch('/functions/addToNewsletterList');
      console.log(response);
      setIsSuccessful(true);
    } catch(error) {
      console.log(error);
      setError(error);
    }
    e.preventDefault();
    return false;
  }

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <p className={styles.title}>Newsletter</p>
      {
        isSuccessful ? (
          <>
            <div className={styles.input}>Thank you!</div>
            <div className={styles.submit}>T</div>
          </>
        ) : (
          <>
            <input className={styles.input} onChange={handleInput} placeholder="enter your email address" value={email} type="text" />
            <input className={styles.submit} type="submit" value=">" />
            {error && <p className={styles.error}>{error}</p>}
          </>
        )
      }
    </form>
  );
};

export default Newsletter;
