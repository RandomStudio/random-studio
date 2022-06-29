export const IMAGE_DATA_OBJECT_FRAGMENT_FUNC = (
  name,
  width,
  height,
  fit = 'max',
) => `
  fragment ${name} on FileField {
    id
    imageData: responsiveImage (
      imgixParams: { fit: ${fit}, w: ${width}, h: ${height}, auto: format }
    ) {
      # HTML5 src/srcset/sizes attributes
      srcSet
      webpSrcSet
      sizes
      src

      # size information (post-transformations)
      width
      height
      aspectRatio

      # SEO attributes
      alt
      title

      # background color placeholder or...
      bgColor

      # blur-up placeholder, JPEG format, base64-encoded
      base64
    }
  }
`;

export const IMAGE_DATA_OBJECT_FRAGMENT = IMAGE_DATA_OBJECT_FRAGMENT_FUNC(
  'ImageDataObject',
  3840,
  2160,
);

export const THUMBNAIL_FRAGMENT = `
  ${IMAGE_DATA_OBJECT_FRAGMENT}
  fragment Thumbnail on ProjectRecord {
    featuredVideo {
      height
      providerUid
      thumbnailUrl
      url
      width
    }
    featuredImage {
      ...ImageDataObject
    }
  }
`;

export const RELATED_THUMBNAIL_FRAGMENT = `
  ${IMAGE_DATA_OBJECT_FRAGMENT_FUNC(
  'RelatedImageDataObject',
  816,
  1024,
  'crop',
)}
  fragment RelatedThumbnail on ProjectRecord {
    featuredVideo {
      height
      providerUid
      thumbnailUrl
      url
      width
    }
    featuredImage {
      ...RelatedImageDataObject
    }
  }
`;

export default {
  IMAGE_DATA_OBJECT_FRAGMENT,
  RELATED_THUMBNAIL_FRAGMENT,
  THUMBNAIL_FRAGMENT,
};
