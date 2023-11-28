import { Image as DatoCMSImage, ImagePropTypes } from 'react-datocms';
import React, { useMemo } from 'react';
import { ImageData } from '../../types/types';

type ImageProps = {
  alt?: string;
  data: ImageData;
  sizes?: string;
} & ImagePropTypes;

const Image = ({
  alt = undefined,
  data,
  sizes = undefined,
  ...rest
}: ImageProps) => {
  const imageData = useMemo(
    () => ({
      ...data,
      alt: alt ?? data.alt,
      sizes: sizes ?? data.sizes,
    }),
    [alt, data, sizes],
  );

  // This is a wrapper around the Dato component. We therefore allow spreading of props to pass anything provided down
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <DatoCMSImage data={imageData} {...rest} />;
};

export default Image;
