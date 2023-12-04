import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './Newsletter.module.css';

type NewsletterProps = {
  className?: string;
};

const Newsletter = ({ className = undefined }: NewsletterProps) => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch(
        `https://random.studio/.netlify/functions/addToNewsletterList?email=${email}`,
      );

      if (response.ok) {
        window.plausible?.('Newsletter Submission', {
          props: {
            result: 'success',
          },
        });

        setIsSuccessful(true);

        return;
      }

      const body = await response.json();

      window.plausible?.('Newsletter Submission', {
        props: {
          result: 'error_mailchimp',
        },
      });

      setError(body.error);
    } catch (responseError) {
      console.error(responseError);

      window.plausible?.('Newsletter Submission', {
        props: {
          result: 'error_backend',
        },
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

          {error !== '' && <p className={styles.error}>{error}</p>}
        </>
      )}
    </form>
  );
};

export default Newsletter;
