export const IMAGE_DATA_OBJECT_FRAGMENT = `
  fragment ImageDataObject on FileField {
    id
    imageData: responsiveImage (
      imgixParams: { fit: max, w: 3840, h: 2160, auto: format }
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

export const THUMBNAIL_FRAGMENT = `
  ${IMAGE_DATA_OBJECT_FRAGMENT}
  fragment Thumbnail on ProjectRecord {
    featuredVideo
    featuredImage {
      ...ImageDataObject
    }
  }
`;

export default {
  IMAGE_DATA_OBJECT_FRAGMENT,
  THUMBNAIL_FRAGMENT,
};
