const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    host: "localhost",
    // 代理
    proxy: {
      "/api": {
        // 基础路径
        target: "http://1.116.64.64:5004/api2/",
        changeOrigin: true,
        // 重写
        pathRewrite: {
          "^/api/": "/",
        },
      },
    },
  },
});
