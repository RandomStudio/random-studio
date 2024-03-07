import '../styles/global.scss';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './App.module.scss';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

const Wonder2 = dynamic(() => import('../components/Wonder2/Wonder2'), {
  ssr: false,
});

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

  const [isWonderFocused, setIsWonderFocused] = useState(false);

  const hasWonder = typeof window !== 'undefined' && window.innerWidth > 768;

  const pageClassNames = classNames(styles.page, {
    [styles.isWonderFocused]: isWonderFocused,
  });

  return (
    <ErrorBoundary>
      <div ref={containerRef}>
        <div className={pageClassNames}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </div>

        {hasWonder && (
          <Wonder2
            containerRef={containerRef}
            isWonderFocused={isWonderFocused}
            setIsWonderFocused={setIsWonderFocused}
          />
        )}

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
