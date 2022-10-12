import PropTypes from 'prop-types';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';

const Layout = ({ children, className, hasFooter, isLogoCentred }) => {
  return (
    <>
      <a className="screen-reader-only" href="#main-content" id="skip-nav">
        {'Skip Navigation'}
      </a>

      <Navigation isLogoCentred={isLogoCentred} />

      <div className={className} id="main-content">
        {children}

        {hasFooter && <Footer />}
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hasFooter: PropTypes.bool,
  isLogoCentred: PropTypes.bool,
};

Layout.defaultProps = {
  className: '',
  hasFooter: true,
  isLogoCentred: false,
};

export default Layout;
