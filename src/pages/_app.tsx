import '../styles/global.css';
import { useRouter } from 'next/router';
// import dynamic from 'next/dynamic';
import React, { useRef } from 'react';
import styles from './App.module.css';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

// const Wonder2 = dynamic(() => import('../components/Wonder2/Wonder2'), {
//   ssr: false,
// });

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
  const containerRef = useRef<HTMLDivElement>(null);

  // const [isWonderFocused, setIsWonderFocused] = useState(false);

  // const hasWonder =
  //   typeof window !== 'undefined' &&
  //   window.innerWidth > 768 &&
  //   !router.route.startsWith('/video/') &&
  //   !router.route.startsWith('/projects/');

  return (
    <ErrorBoundary>
      <div ref={containerRef}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />

        {/* {hasWonder && (
          <Wonder2
            containerRef={containerRef}
            isWonderFocused={isWonderFocused}
            setIsWonderFocused={setIsWonderFocused}
          />
        )} */}

        {isPreview && (
          <div className={styles.preview}>
            {'Viewing preview'}

            <br />

            <a href={`/api/clear-preview?slug=${router.pathname}`}>
              {'(Switch to live)'}
            </a>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
