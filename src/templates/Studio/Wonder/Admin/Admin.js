import React, { useState, useEffect } from 'react';
import styles from './Admin.module.scss';

const Admin = ({ values, setValues }) => {
  const [isVisible, setIsVisible] = useState(false);
  const setter = (i, e) => setValues(v => v.map((val, index) => index === i ? e.target.value : val));
  useEffect(() => {
    const toggleAdmin = (e) => {
      console.log(e, e.altKey, e.keyCode)
      if (e.altKey && e.keyCode === 230) {
        setIsVisible(true);
      }
    };
    window.addEventListener('keypress', toggleAdmin);
    return () => window.removeEventListener('keypress', toggleAdmin);
  }, []);

  console.log(isVisible);
  return !isVisible ? null : (
    <div className={styles.admin}>
      Admin
      {values.map(v => <input type="number" onChange={e => setter(i, e)} value={v} />)}
    </div>
  );
}

export default Admin;
