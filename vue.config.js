const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin') // eslint-disable-line
const CircularDependencyPlugin = require('circular-dependency-plugin') // eslint-disable-line

module.exports = {
  // configureWebpack(config) {
  //   console.log(config.plugins)
  // },
  chainWebpack(config) {
    config.plugin('monaco').use(new MonacoWebpackPlugin())
    config.plugin('circle').use(new CircularDependencyPlugin())
  },
}
