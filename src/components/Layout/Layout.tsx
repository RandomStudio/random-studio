import classNames from 'classnames';
import { ReactNode } from 'react';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';
import useSunset from '../../utils/hooks/useSunset';
import AfterDarkContext from './AfterDarkContext';
import Head from '../Head/Head';
import Container from './Container/Container';

type LayoutProps = {
  children: ReactNode[] | ReactNode;
  className?: string;
  hasFooter?: boolean;
  isFullWidth?: boolean;
  isLogoCentred?: boolean;
};

const Layout = ({
  children,
  className = '',
  hasFooter = true,
  isFullWidth = true,
  isLogoCentred = false,
}: LayoutProps) => {
  const isAfterDark = useSunset();

  const isDarkStyleActive = isAfterDark;

  const layoutClasses = classNames(className, styles.layout, {
    [styles.isAfterDark]: isDarkStyleActive,
  });

  return (
    <AfterDarkContext.Provider value={isAfterDark}>
      <Head />

      <div className={`${layoutClasses} ${isDarkStyleActive && 'isAfterDark'}`}>
        <a className="screen-reader-only" href="#main-content" id="skip-nav">
          {'Skip Navigation'}
        </a>

        <Navigation isLogoCentred={isLogoCentred} />

        <Container id="main-content" isFullWidth={isFullWidth}>
          {children}
        </Container>

        {hasFooter && <Footer />}

        <div className={styles.transitionColorFlash} />
      </div>
    </AfterDarkContext.Provider>
  );
};

export default Layout;
