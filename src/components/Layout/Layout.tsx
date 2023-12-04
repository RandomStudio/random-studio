import classNames from 'classnames';
import { ReactNode } from 'react';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';
import useSunset from '../../utils/hooks/useSunset';
import AfterDarkContext from './AfterDarkContext';

type LayoutProps = {
  children: ReactNode[];
  className?: string;
  hasFooter?: boolean;
  isLogoCentred?: boolean;
  isNewDesign?: boolean;
  hasNavigation?: boolean;
};

const Layout = ({
  children,
  className = '',
  hasFooter = true,
  isLogoCentred = false,
  isNewDesign = false,
  hasNavigation = true,
}: LayoutProps) => {
  const isAfterDark = useSunset();

  const isDarkStyleActive = isAfterDark && isNewDesign;

  const layoutClasses = classNames(className, {
    [styles.newLayout]: isNewDesign,
    [styles.oldLayout]: !isNewDesign,
    [styles.isAfterDark]: isDarkStyleActive,
  });

  return (
    <AfterDarkContext.Provider value={isAfterDark}>
      <div className={`${layoutClasses} ${isDarkStyleActive && 'isAfterDark'}`}>
        <a className="screen-reader-only" href="#main-content" id="skip-nav">
          {'Skip Navigation'}
        </a>

        {hasNavigation && (
          <div className={styles.newLayout}>
            <Navigation isLogoCentred={isLogoCentred} />
          </div>
        )}

        <div className={styles.wrapper} id="main-content">
          {children}
        </div>

        <div className={styles.newLayout}>{hasFooter && <Footer />}</div>

        <div className={styles.transitionColorFlash} />
      </div>
    </AfterDarkContext.Provider>
  );
};

export default Layout;
