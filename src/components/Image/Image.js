import { Image as DatoCMSImage } from 'react-datocms';
import React, { useMemo } from 'react';

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

export default Image;
