import React, { useState, useEffect } from 'react';
import styles from './Admin.module.scss';

const Admin = ({ values, setValues }) => {
  const [isVisible, setIsVisible] = useState(false);
  const setter = (i, newVal) => setValues(v => v.map((val, index) => index === i ? newVal : val));
  useEffect(() => {
    const toggleAdmin = (e) => {
      if (e.altKey && e.keyCode === 230) {
        setIsVisible(true);
      }
    };
    window.addEventListener('keypress', toggleAdmin);
    return () => window.removeEventListener('keypress', toggleAdmin);
  }, []);

  return !isVisible ? null : (
    <div className={styles.admin}>
      Admin
      {values.map((v, i) => <input type="number" onChange={e => setter(i, e.target.value)} value={v} />)}
    </div>
  );
}

export default Admin;
