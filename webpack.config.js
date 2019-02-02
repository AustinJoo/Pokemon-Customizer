var path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/app.jsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './client/dist')
  }, 
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: { 
          presets: ['env','react']
        }
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ]
  }
};