import React, { useEffect, useState } from 'react';
import { AppProvider } from '../../utils/context/AppContext';
import styles from './Layout.module.scss';
import Navigation from '../Navigation/Navigation';
import Toast from '../Toast/Toast';
import { useToastVisibility } from '../../utils/hooks/useToastVisiblity';
import Footer from '../Footer/Footer';

const backgroundTransitionColors = ['#0000FF', '#FFFF00', '#00FFFF', '#FF00FF'];

const Layout = ({ children, className, layout }) => {
  const toastVisiblity = useToastVisibility();
  const [randomStyle, setRandomStyle] = useState({});

  useEffect(() => {
    if (!process.browser) {
      return;
    }

    const randomOffset = Math.floor(
      Math.random() * backgroundTransitionColors.length,
    );

    setRandomStyle({
      '--backgroundColor': backgroundTransitionColors[randomOffset],
    });
  }, []);

  return (
    <AppProvider value={toastVisiblity}>
      <a className="screen-reader-only" href="#main-content" id="skip-nav">
        {'Skip Navigation'}
      </a>
      <Navigation layout={layout} />
      <div className={`${styles.container} ${className}`} id="main-content">
        {children}
        <Footer />
      </div>
      <div className={styles.backgroundTransition} style={randomStyle} />
      <Toast copy="Copied to clipboard" />
    </AppProvider>
  );
};

export default Layout;
