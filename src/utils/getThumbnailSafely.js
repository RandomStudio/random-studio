const getThumbnailSafely = (thumbnail) => {
  if (!thumbnail) {
    return null;
  }

  if (!thumbnail.childImageSharp) {
    return thumbnail.publicURL;
  }

  return thumbnail.childImageSharp.fixed.src;
};

export default getThumbnailSafely;
