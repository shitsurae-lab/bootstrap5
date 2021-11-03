//const path = require('path'); 『output: 』には絶対パスが必要なため、こちらの記述が必要となる
const path = require('path');

// production モード以外の場合、変数 enabledSourceMap は true
const enabledSourceMap = process.env.NODE_ENV !== 'production';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/js/main.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/main.js',
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                // プリセットを指定することで、ES2021 を ES5 に変換
                '@babel/preset-env',
              ],
            },
          },
        ],
      },
      {
        test: /\.(css|sass|scss)$/,
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
            //scssのソースマップ(※ソースマップを出力すると重くなるので開発のとき以外はfalseにしておくとよい)
            options: {
              sourceMap: enabledSourceMap,
              // sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              //dart-sass優先
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
              },
              //webpack を使って Sass をコンパイルする方法(http://bit.ly/webpack5_compile)
              sourceMap: enabledSourceMap,
              // sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg)$/,
        //以下4行はwebpack5のasett modulesの機能
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
        use: [
          //file - loaderやurl - loaderはいらなくなったためコメントアウト
          //  {
          //  loader:'file-loader',
          //   options: {
          //     esModule: false,
          //     name: 'images[name]//.ext',
          //   },
          //  },
          {
            //image-webpack-loader(https://github.com/tcoopman/image-webpack-loader)
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
            },
          },
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
  //注意: 並列関係,「plugin:」ではなくplugins:
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
    new HtmlWebpackPlugin({
      template: './src/templates/members/taro.pug',
      filename: 'members/taro.html',
    }),
    new CleanWebpackPlugin(),
  ],
  devtool: 'source-map',
  // WARNING in child compilations
  // stats: {
  //   children: true,
  // },
};
