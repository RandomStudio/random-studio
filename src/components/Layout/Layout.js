import '../../styles/reset.css';
import '../../styles/vars.css';
import '../../styles/global.css';
import React from 'react';
import styles from './Layout.module.scss';
import Navigation from '../Navigation/Navigation';
import { AppProvider } from '../../utils/context/AppContext';
import Toast from '../Toast/Toast';
import { useToastVisibility } from '../../utils/hooks/useToastVisiblity';

const backgroundTransitionColors = ['#0000FF', '#FFFF00', '#00FFFF', '#FF00FF'];

const Layout = ({ children }) => {
  const toastVisiblity = useToastVisibility();

  return (
  <AppProvider value={toastVisiblity}>
    <>
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
    </>
  </AppProvider>
)};

export default Layout;
