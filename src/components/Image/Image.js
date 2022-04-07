// This is a wrapper around the Dato component. We therefore allow spreading of props to pass anything provided down
/* eslint-disable react/jsx-props-no-spreading */
import { Image as DatoCMSImage } from 'react-datocms';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { imageDataPropType } from '../../propTypes';

const Image = ({ alt, data, sizes, ...rest }) => {
  const imageData = useMemo(
    () => ({
      ...data,
      alt: alt ?? data.alt,
      sizes: sizes ?? data.sizes,
    }),
    [alt, data, sizes],
  );

  return <DatoCMSImage data={imageData} {...rest} />;
};

Image.propTypes = {
  alt: PropTypes.string,
  data: imageDataPropType.isRequired,
  sizes: PropTypes.string,
};

Image.defaultProps = {
  alt: null,
  sizes: null,
};

export default Image;
