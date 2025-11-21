const path = require('path');
const srcPath = path.resolve(__dirname, '../../src');
const internalizePackages = ['@jiangshengdev/material-design-icons-vue-next'];

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
    ssr: {
      noExternal: internalizePackages,
    },
  },
};
