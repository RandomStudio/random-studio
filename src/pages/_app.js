import '../styles/global.scss';
import React, { useEffect } from 'react';
import { pageview, initialize, set } from 'react-ga';
import { useRouter } from 'next/router';
import Script from 'next/script';

const App = ({ Component, pageProps }) => {
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

  return <Component {...pageProps} />;
};

export default App;
