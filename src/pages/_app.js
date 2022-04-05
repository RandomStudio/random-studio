// This is a weird file, disable two ESLint rules to match next.js style
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import '../styles/global.scss';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { pageview, initialize, set } from 'react-ga';
import styles from './App.module.scss';

const App = ({ Component, pageProps, __N_PREVIEW: isPreview }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = url => {
      set({ page: url });
      pageview(url);
    };

    initialize('UA-9384788-13', { debug: false });

    set({
      anonymizeIp: true,
      page: router.pathname,
    });

    pageview(router.pathname);
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, router.pathname]);

  return (
    <>
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
  );
};

export default App;
