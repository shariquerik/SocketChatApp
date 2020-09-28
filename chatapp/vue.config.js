module.exports = {
    configureWebpack: { 
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'VUE_APP_URL': '/'
          }
        })
      ]
    }
  }