module.exports = {
    devServer: {
        host: "",
        port: 8089,
        https: true,
        hotOnly: false,
        open: false,
        proxy: {
          "/": {
            target: "http://10.15.97.13:8076",
            changOrigin: true //允许跨域
          }
        }
      }
}