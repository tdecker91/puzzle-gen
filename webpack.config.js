var path = require('path');

var config = {
  mode: 'development',
  entry: __dirname + '/src/index.ts',
  devtool: 'source-map',
  output: {
    library: "sr-visualizer",
    libraryTarget: "umd", // exposes and know when to use module.exports or exports
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};

module.exports = config;