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
}) => {
  const isAfterDark = useSunset();

  const layoutClasses = classNames({
    className,
    [styles.newLayout]: isNewDesign,
    [styles.oldLayout]: !isNewDesign,
    [styles.isAfterDark]: isAfterDark,
  });

  return (
    <AfterDarkContext.Provider value={isAfterDark}>
      <div className={layoutClasses}>
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
};

Layout.defaultProps = {
  className: '',
  hasFooter: true,
  isLogoCentred: false,
  isNewDesign: false,
};

export default Layout;
