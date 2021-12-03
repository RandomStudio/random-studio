const checkAndroid = () => {
  if (
    typeof window !== 'undefined' &&
    window.navigator.userAgent.match(/Android|webOS/)
  ) {
    return true;
  }

  return false;
};

export default checkAndroid;
