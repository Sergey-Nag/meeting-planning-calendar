const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const PrettierWebpackPlugin = require('prettier-webpack-plugin');

module.exports = (env) => ({
  entry: {
    index: './src/index.js',
    createPage: './src/create-page.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name]-bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ejs$/i,
        loader: 'ejs-loader',
        options: {
          esModule: false,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]',
        },
      },
    ],
  },
  devtool: env.production ? undefined : 'eval-source-map',
  plugins: [
    new StylelintWebpackPlugin({
      files: './src/**/*.scss'
    }),
    new PrettierWebpackPlugin({
      semi: true,
      encoding: 'utf-8',
      singleQuote: true,
      arrowParens: 'always',
      bracketSpacing: true,
      endOfLine: 'crlf'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
    new HtmlWebpackPlugin({
      title: 'Calendar',
      templateParameters: {
        view: 'calendar',
        controls: 'calendar-controls',
      },
      chunks: ['index'],
      hash: true,
      minify: false,
      template: path.resolve(__dirname, 'src', 'template.ejs'),
      filename: path.resolve(__dirname, 'dist', 'index.html'),
    }),
    new HtmlWebpackPlugin({
      title: 'Create event',
      templateParameters: {
        view: 'create-event',
        controls: 'create-event-controls',
      },
      chunks: ['createPage'],
      hash: true,
      minify: false,
      template: path.resolve(__dirname, 'src', 'template.ejs'),
      filename: path.resolve(__dirname, 'dist', 'create-event.html'),
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
});
