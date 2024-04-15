import '../styles/global.css';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './App.module.css';
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
      <>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
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
      </>
    </ErrorBoundary>
  );
};

export default App;
