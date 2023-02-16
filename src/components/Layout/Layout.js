import PropTypes from 'prop-types';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';
import useSunset from '../../utils/hooks/useSunset';
import classNames from '../../utils/classNames';
import AfterDarkContext from './AfterDarkContext';

const Layout = ({
  children,
  className,
  hasFooter,
  isLogoCentred,
  isNewDesign,
  isWhiteBg,
}) => {
  const isAfterDark = useSunset();

  const isDarkStyleActive = isAfterDark && isNewDesign;

  const layoutClasses = classNames({
    className,
    [styles.newLayout]: isNewDesign,
    [styles.oldLayout]: !isNewDesign,
    [styles.isAfterDark]: isDarkStyleActive,
    [styles.whiteBg]: isWhiteBg,
  });

  return (
    <AfterDarkContext.Provider value={isAfterDark}>
      <div className={`${layoutClasses} ${isDarkStyleActive && 'isAfterDark'}`}>
        <a className="screen-reader-only" href="#main-content" id="skip-nav">
          {'Skip Navigation'}
        </a>

        <div className={styles.newLayout}>
          <Navigation isLogoCentred={isLogoCentred} />
        </div>

        <div className={styles.wrapper} id="main-content">
          {children}
        </div>

        <div className={styles.newLayout}>{hasFooter && <Footer />}</div>

        <div className={styles.transitionColorFlash} />
      </div>
    </AfterDarkContext.Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hasFooter: PropTypes.bool,
  isLogoCentred: PropTypes.bool,
  isNewDesign: PropTypes.bool,
  isWhiteBg: PropTypes.bool,
};

Layout.defaultProps = {
  className: '',
  hasFooter: true,
  isLogoCentred: false,
  isNewDesign: false,
  isWhiteBg: false,
};

export default Layout;
