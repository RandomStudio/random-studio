import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Newsletter.module.scss';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleInput = e => setEmail(e.target.value);

  const handleSubmit = async () => {
    const response = await fetch('https://api.mailchimp.com/3.0/lists/cf9e550f84/members/', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: authenticationString,
      },
      body: JSON.stringify({
        email,
      }),
    });
    return false;
  }

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <p className={styles.title}>Newsletter</p>
      <input className={styles.input} onChange={handleInput} placeholder="enter your email address" value={email} type="text" />
      <input className={styles.submit} type="submit" value=">" />
    </form>
  );
};

export default Newsletter;
