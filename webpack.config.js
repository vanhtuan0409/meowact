const webpack = require("webpack");
const fs = require("fs");
const path = require("path");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  entry: resolveApp("./index.js"),
  target: "web",
  mode: "production",
  devtool: "source-map",
  output: {
    path: resolveApp("./dist"),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        loader: "babel-loader"
      }
    ]
  }
};
