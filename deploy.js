/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const setting = {
  version: 2,
  builds: [
    {
      src: 'main.js',
      use: '@vercel/node',
    },
  ],
  routes: [
    {
      src: '/(.*)',
      dest: 'main.js',
    },
  ],
};
const packageJson = fs.readFileSync('package.json');
fs.writeFileSync('./dist/vercel.json', JSON.stringify(setting));
fs.writeFileSync('./dist/package.json', JSON.stringify(packageJson));
