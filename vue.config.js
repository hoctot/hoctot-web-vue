module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 'primary-color': '#38d39f',
          // 'link-color': '#38d39f',
          // 'border-radius-base': '2px',
        },
        javascriptEnabled: true,
      },
    },
  },
}
