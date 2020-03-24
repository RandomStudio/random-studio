import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image/withIEPolyfill';

const FluidImage = ({ image, objectFit, loading }) =>
  image.childImageSharp ? (
    <Img
      objectFit={objectFit}
      loading={loading}
      fluid={image.childImageSharp.fluid}
    />
  ) : (
    <div>
      <img alt="" src={image} />
    </div>
  );

FluidImage.propTypes = {
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  objectFit: PropTypes.string,
  loading: PropTypes.string,
};

FluidImage.defaultProps = {
  objectFit: 'cover', // default
  loading: 'auto',
};

export default FluidImage;
