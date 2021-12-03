import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider } from '../../utils/context/AppContext';
import styles from './Layout.module.scss';
import Navigation from '../Navigation/Navigation';
import Toast from '../Toast/Toast';
import { useToastVisibility } from '../../utils/hooks/useToastVisiblity';

const backgroundTransitionColors = ['#0000FF', '#FFFF00', '#00FFFF', '#FF00FF'];

const Layout = ({ children }) => {
  const toastVisiblity = useToastVisibility();

  return (
    <HelmetProvider>
      <AppProvider value={toastVisiblity}>
        <Navigation />
        <div className={styles.container}>{children}</div>
        <Navigation />
        <div
          className={styles.backgroundTransition}
          style={{
            backgroundColor:
              backgroundTransitionColors[
                Math.floor(Math.random() * backgroundTransitionColors.length)
              ],
          }}
        />
        <Toast copy="Copied to clipboard" />
      </AppProvider>
    </HelmetProvider>
  );
};

export default Layout;
