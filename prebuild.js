if (!process.env.GITHUB_ACTIONS) {
  console.log('Not building on github');

  return;
}
const fs = require('fs');
fs.rmdirSync('./public/img', { recursive: true });
