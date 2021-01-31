const HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");

var config = {
  mode: "production",
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: "tsconfig.demos.json",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
};

var indexConfig = Object.assign({}, config, {
  entry: __dirname + "/src/demos/index.ts",
  output: {
    path: path.resolve(__dirname, "demos/"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/demos/index.html",
      minify: {
        collapseWhitespace: false,
      },
    }),
  ],
  devServer: {
    static: path.join(__dirname, "demos"),
    host: "localhost",
    compress: true,
    port: 9000,
  },
});

var puzzlesConfig = Object.assign({}, config, {
  entry: __dirname + "/src/demos/puzzles/puzzles.ts",

  output: {
    path: path.resolve(__dirname, "demos/puzzles"),
    filename: "[name].js",
    library: "puzzlesDemo",
    libraryTarget: "umd", // exposes and know when to use module.exports or exports
    globalObject: "this",
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/demos/puzzles/index.html",
      minify: {
        collapseWhitespace: false,
      },
    }),
  ],
});

var mouseRotationConfig = Object.assign({}, config, {
  entry: __dirname + "/src/demos/mouseRotation/mouseRotation.ts",

  output: {
    path: path.resolve(__dirname, "demos/mouseRotation"),
    filename: "[name].js",
    library: "rotationDemo",
    libraryTarget: "umd",
    globalObject: "this",
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/demos/mouseRotation/index.html",
      minify: {
        collapseWhitespace: false,
      },
    }),
  ],
});

var cameraValuesConfig = Object.assign({}, config, {
  entry: __dirname + "/src/demos/cameraValues/cameraValues.ts",

  output: {
    path: path.resolve(__dirname, "demos/cameraValues"),
    filename: "[name].js",
    library: "cameraValuesDemo",
    libraryTarget: "umd", // exposes and know when to use module.exports or exports
    globalObject: "this",
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/demos/cameraValues/index.html",
      minify: {
        collapseWhitespace: false,
      },
    }),
  ],
});

module.exports = [
  indexConfig,
  cameraValuesConfig,
  puzzlesConfig,
  mouseRotationConfig,
];
