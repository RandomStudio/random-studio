import classNames from 'classnames';
import { ReactNode } from 'react';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';
import useSunset from '../../utils/hooks/useSunset';
import AfterDarkContext from './AfterDarkContext';
import Head from '../Head/Head';
import { Image } from '../../types/types';

type LayoutProps = {
  children: ReactNode[] | ReactNode;
  className?: string;
  hasFooter?: boolean;
  isLogoCentred?: boolean;
  description?: string;
  title?: string;
  image?: Image | string;
  socialDescription?: string;
  socialTitle?: string;
};

const Layout = ({
  children,
  className = '',
  hasFooter = true,
  description = undefined,
  title = undefined,
  image = undefined,
  socialDescription = undefined,
  socialTitle = undefined,
}: LayoutProps) => {
  const isAfterDark = useSunset();

  const isDarkStyleActive = isAfterDark;

  const layoutClasses = classNames(className, styles.layout, {
    [styles.isAfterDark]: isDarkStyleActive,
  });

  return (
    <AfterDarkContext.Provider value={isAfterDark}>
      <Head
        description={description}
        image={image}
        socialDescription={socialDescription}
        socialTitle={socialTitle}
        title={title}
      />

      <div className={`${layoutClasses} ${isDarkStyleActive && 'isAfterDark'}`}>
        <a className="screen-reader-only" href="#main-content" id="skip-nav">
          {'Skip Navigation'}
        </a>

        <div className={styles.padding}>
          <Navigation />
        </div>

        {children}

        {hasFooter && (
          <div className={styles.padding}>
            <Footer />
          </div>
        )}

        <div className={styles.transitionColorFlash} />
      </div>
    </AfterDarkContext.Provider>
  );
};

export default Layout;
