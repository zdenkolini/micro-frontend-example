const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3002,
  },
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/env", "@babel/typescript", "@babel/react"],
          plugins: [
            ["@babel/plugin-transform-regenerator"],
            ["@babel/plugin-syntax-dynamic-import"],
            ["transform-class-properties"],
            [
              "@babel/plugin-transform-arrow-functions",
              {
                spec: true,
              },
            ],
          ],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "kanban_app",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "@reduxjs/toolkit": { singleton: true },
        "react-redux": { singleton: true },
        redux: { singleton: true },
        "react-router": { singleton: true },
        "react-router-dom": { singleton: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
