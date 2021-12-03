if (!process.env.GITHUB_ACTIONS) {
  console.log('Not building on github');

  return;
}

fs.rmdirSync('./public', { recursive: true });
