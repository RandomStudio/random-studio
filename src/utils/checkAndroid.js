const checkAndroid = () => {
  if (navigator.userAgent.match(/Android|webOS/)) {
    return true;
  } else {
    return false;
  }
};

export default checkAndroid;
