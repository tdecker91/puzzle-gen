var path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

var config = {
  mode: "production",
  entry: __dirname + "/src/index.ts",
  devtool: "source-map",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        keep_classnames: true
      }
    })]
  },
  output: {
    path: path.resolve(__dirname, "dist/bundle"),
    filename: "puzzleGen.min.js",
    library: "puzzleGen",
    libraryTarget: "umd", // exposes and know when to use module.exports or exports
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    host: "localhost",
    compress: true,
    port: 9000,
  },
};

module.exports = config;
