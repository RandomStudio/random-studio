/* eslint-disable react/jsx-props-no-spreading */
import '../styles/global.scss';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './App.module.scss';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

type AppProps = {
  Component: React.FC;
  pageProps: {
    [key: string]: unknown;
  };
  // Next prop is named by Nextjs
  // eslint-disable-next-line react/boolean-prop-naming
  __N_PREVIEW: boolean;
};

const App = ({ Component, pageProps, __N_PREVIEW: isPreview }: AppProps) => {
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
