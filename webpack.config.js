//output: には絶対パスが必要なため、const pathの記述が必要となる
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          {
            //CSSを適用
            loader: 'style-loader',
          },
          {
            //読み込んだCSS
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
};
