//const path = require('path'); 『output: 』には絶対パスが必要なため、こちらの記述が必要となる
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/main.js',
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          {
            //CSSを適用
            // loader: 'style-loader',
            //style-loaderの代わりにMiniCssExtractPlugin.loaderが役割を果たす
            loader: MiniCssExtractPlugin.loader,
          },
          {
            //読み込んだCSS
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  //注意: 並列関係,plugins
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/style.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
};
