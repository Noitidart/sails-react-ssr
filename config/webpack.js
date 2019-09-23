const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const fs = require('fs');
const { mapValues } = require('lodash');
const glob = require('glob');

module.exports.webpack = {
  config: [
    {
      mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
      devtool: process.env.NODE_ENV === 'production' ? undefined : 'eval-source-map',
      entry: './assets/js/index.js',
      output: {
        filename: 'index.bundle.js',
        path: path.resolve(__dirname, '../.tmp/public/js'),
        publicPath: '/js/'
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: 'index.bundle.css'
        }),
        new CopyPlugin([
          {
            from: './assets',
            to: '../',
            ignore: ['js/**/*', 'styles/**/*', '.eslintrc']
          },
        ]),
      ],
      module: {
        rules: [
          { test: /\.js$/, exclude: /node_modules|dependencies/, loader: 'babel-loader' },
          { test: /\.css$/, exclude: /node_modules/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
          { test: /\.less$/, exclude: /node_modules/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] }
        ]
      }
    },
    {
      target: 'node',
      mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
      devtool: process.env.NODE_ENV === 'production' ? undefined : 'eval-source-map',
      // create a bundle for each page, and name the bundle by the directory name (which should be the page name)
      entry: glob.sync('./assets/js/pages/**/index.js').reduce((acc, path) => {
        acc[path] = path;
        return acc;
      }, {}),
      output: {
        filename: '[name]',
        library: 'component',
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, '../.tmp/public/ssr'),
        publicPath: '/ssr/'
      },
      plugins: [
        new MiniCssExtractPlugin(),
      ],
      module: {
        rules: [
          { test: /\.js$/, exclude: /node_modules|dependencies/, loader: 'babel-loader' },
          { test: /\.css$/, exclude: /node_modules/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
          { test: /\.less$/, exclude: /node_modules/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] }
        ]
      },
      // convert dependencies to look like { react: true, lodash: true }
      externals: mapValues(
        JSON.parse(fs.readFileSync('package.json', { encoding: 'utf-8' })).dependencies,
        (_val, key) => ({ commonjs: key })
      )
    }
  ]
};
