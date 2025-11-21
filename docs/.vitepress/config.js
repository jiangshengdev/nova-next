const path = require('path');
const srcPath = path.resolve(__dirname, '../../src');

module.exports = {
  title: 'Nova',
  vite: {
    resolve: {
      alias: [
        {
          find: /^\/@nova\//,
          replacement: `${srcPath}/`,
        },
      ],
    },
  },
};
