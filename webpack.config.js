var path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: ['babel-polyfill', path.join(__dirname, '/client/app.jsx')]
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/client')
  }, 
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx?$/],
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: { 
          presets: ['env', 'react', 'stage-0']
        }
      }
    ]
  }
};