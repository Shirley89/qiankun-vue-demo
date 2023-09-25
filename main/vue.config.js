const path = require('path');

module.exports = {
  transpileDependencies: ['single-spa','qiankun','import-html-entry'],
  configureWebpack: {
    resolve: {
      alias: {
        'common': '@/../../common',
      }
    }
  }
};

