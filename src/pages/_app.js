// This is a weird file, disable two ESLint rules to match next.js style
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import '../styles/global.scss';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './App.module.scss';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

const App = ({ Component, pageProps, __N_PREVIEW: isPreview }) => {
  const router = useRouter();

  return (
    <ErrorBoundary>
      <Component {...pageProps} />

      {isPreview && (
        <div className={styles.preview}>
          {'Viewing preview'}

          <br />

          <a href={`/api/clear-preview?slug=${router.pathname}`}>
            {'(Switch to live)'}
          </a>
        </div>
      )}
    </ErrorBoundary>
  );
};

export default App;
