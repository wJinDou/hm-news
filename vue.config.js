module.exports = {
  devServer: {
    open: true,
    port: 8888,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '/api': '' },
        secure: false
      }
    }
  },
  configureWebpack: {
    externals: {
      vue: 'Vue',
      lodash: '_',
      axios: 'axios',
      moment: 'moment',
      'vue-router': 'VueRouter'
    }
  }
}
