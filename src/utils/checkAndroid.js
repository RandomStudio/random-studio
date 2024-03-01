const checkAndroid = () => {
  if (navigator.userAgent.match(/Android|webOS/)) {
    console.log('hello android');
    return true;
  } else {
    console.log('not android');
    return false;
  }
};

export default checkAndroid;
