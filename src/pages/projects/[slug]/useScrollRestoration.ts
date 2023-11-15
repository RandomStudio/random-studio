import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useScrollRestoration = () => {
  const router = useRouter();
  const { history } = window;

  // set scroll restoration to manual
  useEffect(() => {
    if (
      'scrollRestoration' in history &&
      history.scrollRestoration !== 'manual'
    ) {
      history.scrollRestoration = 'manual';
    }
  }, [history]);

  // handle and store scroll position
  useEffect(() => {
    const handleRouteChange = (nextPath: string) => {
      const isOpeningVideo = nextPath.startsWith('/video');

      if (isOpeningVideo) {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  // restore scroll position
  useEffect(() => {
    if ('scrollPosition' in sessionStorage) {
      window.scrollTo(0, Number(sessionStorage.getItem('scrollPosition')));
      sessionStorage.removeItem('scrollPosition');
    }
  }, []);
};

export default useScrollRestoration;
