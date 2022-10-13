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
    [styles.isAfterDark]: isAfterDark,
  });

  return (
    <AfterDarkContext.Provider value={isAfterDark}>
      <div className={layoutClasses}>
        <a className="screen-reader-only" href="#main-content" id="skip-nav">
          {'Skip Navigation'}
        </a>

        <Navigation isLogoCentred={isLogoCentred} />

        <div className={styles.wrapper} id="main-content">
          {children}
        </div>

        {hasFooter && <Footer />}
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
  isNewDesign: true,
};

export default Layout;
