// This is a wrapper around the Dato component. We therefore allow spreading of props to pass anything provided down
import { Image as DatoCMSImage, ImagePropTypes } from 'react-datocms';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { imageDataPropType } from '../../propTypes';

type ImageProps = {
  alt: string,
  data: ImageData,
  sizes: string,
} & ImagePropTypes;

const Image = ({ alt, data, sizes, ...rest }: ImageProps) => {
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
