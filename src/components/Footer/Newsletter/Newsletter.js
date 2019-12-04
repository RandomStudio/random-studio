import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Newsletter.module.scss';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleInput = e => setEmail(e.target.value);

  const handleSubmit = () => {
    console.log(email);
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
