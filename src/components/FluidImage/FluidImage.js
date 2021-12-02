import React from 'react';
import PropTypes from 'prop-types';

const FluidImage = ({
  image, objectFit, loading, className,
}) => (
  <div className={className}>
    <img alt="" src={image?.childImageSharp?.fluid ?? image} />
  </div>
);

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
