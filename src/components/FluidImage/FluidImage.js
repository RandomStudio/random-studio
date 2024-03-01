import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image/withIEPolyfill';

const FluidImage = ({
  image, objectFit, loading, className,
}) => (image.childImageSharp ? (
  <Img
    className={className}
    objectFit={objectFit}
    loading={loading}
    fluid={image.childImageSharp.fluid}
  />
) : (
  <div className={className}>
    <img alt="" src={image} />
  </div>
));

FluidImage.propTypes = {
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  objectFit: PropTypes.oneOf(['contain', 'cover']),
  loading: PropTypes.string,
  className: PropTypes.string,
};

FluidImage.defaultProps = {
  className: '',
  objectFit: 'cover', // default
  loading: 'auto',
};

export default FluidImage;
