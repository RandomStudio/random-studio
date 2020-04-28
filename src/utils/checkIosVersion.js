const checkVersion = () => {
  if (typeof window !== `undefined`) {
    let agent = window.navigator.userAgent,
      start = agent.indexOf(`OS`);
    if (
      (agent.indexOf(`iPhone`) > -1 || agent.indexOf(`iPad`) > -1) &&
      start > -1
    ) {
      return window.Number(agent.substr(start + 3, 3).replace(`_`, `.`));
    }
  }
  return 0;
};

export default checkVersion;
