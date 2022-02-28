module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            "primary-color": "#4C84FFed", // 全局主色
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  devServer: {
    host: "",
    port: 8089,
    https: false,
    hotOnly: false,
    open: false,
    proxy: {
      "/": {
        target: "http://119.23.136.12:8801",
        changOrigin: true, //允许跨域
      },
    },
  },
  lintOnSave:false, //关闭eslint检查
};
