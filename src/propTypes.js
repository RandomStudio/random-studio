import PropTypes from 'prop-types';

export const imageDataPropType = PropTypes.shape({
  id: PropTypes.string,
  imageData: PropTypes.shape({
    srcSet: PropTypes.string.isRequired,
    webpSrcSet: PropTypes.string.isRequired,
    sizes: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    aspectRatio: PropTypes.number.isRequired,
    alt: PropTypes.string,
    title: PropTypes.string,
    bgColor: PropTypes.string.isRequired,
    base64: PropTypes.string.isRequired,
  }),
});

export const videoPropType = PropTypes.shape({
  baseUrl: PropTypes.string.isRequired,
  blur: PropTypes.string.isRequired,
  fallback: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  hls: PropTypes.string.isRequired,
  sources: PropTypes.arrayOf(PropTypes.string).isRequired,
  width: PropTypes.number.isRequired,
});

export const slidePropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  video: PropTypes.oneOfType([videoPropType, PropTypes.oneOf([''])]),
  image: imageDataPropType,
});

export const videoBlockPropType = PropTypes.shape({
  __typename: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  loops: PropTypes.bool.isRequired,
  isMuted: PropTypes.bool.isRequired,
  isAlwaysMuted: PropTypes.bool.isRequired,
  hasControls: PropTypes.bool.isRequired,
  caption: PropTypes.string.isRequired,
  autoplay: PropTypes.bool.isRequired,
  marginTop: PropTypes.number.isRequired,
  marginLeft: PropTypes.number.isRequired,
  video: videoPropType.isRequired,
  width: PropTypes.number.isRequired,
});

export const imageBlockPropType = PropTypes.shape({
  __typename: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: imageDataPropType.isRequired,
  width: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  marginLeft: PropTypes.number.isRequired,
});

export const textBlockPropType = PropTypes.shape({
  __typename: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  marginLeft: PropTypes.number.isRequired,
});

export const carouselBlockPropType = PropTypes.shape({
  __typename: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  marginLeft: PropTypes.number.isRequired,
  slides: PropTypes.arrayOf(slidePropType).isRequired,
});

export const blockPropType = PropTypes.oneOfType([
  carouselBlockPropType,
  imageBlockPropType,
  textBlockPropType,
  videoBlockPropType,
]);

export const relatedProjectPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
  featuredImage: imageDataPropType,
  featuredVideo: videoPropType,
});

export const opengraphPropType = PropTypes.shape({
  description: PropTypes.string,
  title: PropTypes.string,
  twitterCard: PropTypes.string,
  image: imageDataPropType,
});

export const projectPropTypeObject = {
  id: PropTypes.string,
  slug: PropTypes.string,
  intro: PropTypes.string,
  title: PropTypes.string.isRequired,
  details: PropTypes.objectOf(PropTypes.string),
  featuredImage: imageDataPropType,
  featuredVideo: videoPropType,
  relatedProjectsTitle: PropTypes.string,
  relatedProjects: PropTypes.arrayOf(relatedProjectPropType),
  tags: PropTypes.arrayOf(PropTypes.string),
  content: PropTypes.arrayOf(blockPropType),
  opengraph: opengraphPropType,
};

export const projectPropType = PropTypes.shape(projectPropTypeObject);

export const dayNightImageBlockPropType = PropTypes.shape({
  __typename: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired,
  image: imageDataPropType,
  nightImage: imageDataPropType,
});

export const vacancyPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  _publishedAt: PropTypes.string.isRequired,
});
