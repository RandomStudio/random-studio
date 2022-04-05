import '../styles/global.scss';
import React, { useEffect } from 'react';
import { pageview, initialize, set } from 'react-ga';
import { useRouter } from 'next/router';
import DefaultApp from 'next/app';

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

App.getInitialProps = async appContext => {
  const { req, res } = appContext.ctx;
  const url = new URL(`http://fakeurl.com${req.url}`);
  const isPreview = url.searchParams.get('preview');

  // Important: we check for null explicitly so that `?preview` without a value is still valid
  if (isPreview === null) {
    res.setHeader('Set-Cookie', [
      '__next_preview_data=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
      '__prerender_bypass=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
    ]);
  }

  return DefaultApp.getInitialProps(appContext);
};

export default App;
