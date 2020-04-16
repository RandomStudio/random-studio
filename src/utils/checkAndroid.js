const checkAndroid = () => {
  if (typeof window !== `undefined` && window.navigator.userAgent.match(/Android|webOS/)) {
    return true;
  } else {
    return false;
  }
};

export default checkAndroid;
