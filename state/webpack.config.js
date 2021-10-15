const path = require('path');
const packageJson = require('./package.json');

module.exports = (opts) => {
  let isProduction =
    opts.argv && (opts.argv.p || opts.argv.mode === 'production');

  return {
    mode: isProduction ? 'production' : 'development',
    output: {
      filename: `index.js`,
      libraryTarget: 'system',
      path: path.resolve(process.cwd(), 'dist/state'),
      uniqueName: packageJson.name,
      publicPath: '/state/',
    },
    module: {
      rules: [
        {
          parser: {
            system: false,
          },
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.html$/i,
          use: ['html-loader'],
        },
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        },
      ],
    },
    devtool: 'source-map',
    devServer: {
      compress: true,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    },
    target: ["web", "es5"],
    externals: ['single-spa','rxjs'],
  };
};