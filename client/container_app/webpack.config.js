const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const pkg = require("./package.json");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { SourceMapDevToolPlugin } = require("webpack");
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: {
    app: ["@babel/polyfill", "./src/index.tsx"],
  },
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3000,
    historyApiFallback: true,
  },
  output: {
    path: path.resolve(process.cwd(), "dist"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
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
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ttf|eot)$/,
        include: [path.resolve(__dirname, "../src")],
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "static/images/",
              publicPath: "./static/images",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      src: path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Micro frontend example",
      template: "./public/index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new ModuleFederationPlugin({
      name: "container_app",
      remotes: {
        documents_app:
          "documents_app@[window.documents_app_url]/remoteEntry.js",
        kanban_app: "kanban_app@[window.kanban_app_url]/remoteEntry.js",
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
    new CleanWebpackPlugin(),
    new ExternalTemplateRemotesPlugin(),
    new Dotenv({
      safe: true,
    }),
    new SourceMapDevToolPlugin(),
  ],
};
