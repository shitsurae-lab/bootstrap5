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
      {
        test: /\.png|jpg/,
        //以下4行はwebpack5のasett modulesの機能(file-loaderやurl-loaderはいらなくなる)
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
        use: [
          //  {
          //  loader:'file-loader',
          //   options: {
          //     esModule: false,
          //     name: 'images[name]//.ext',
          //   },
          //  },
        ],
      },
      {
        test: /\.pug/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
            },
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
      template: './src/templates/index.pug',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/access.pug',
      filename: 'access.html',
    }),
    new CleanWebpackPlugin(),
  ],
};
