const { ModuleFederationPlugin } = require("webpack").container;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "/settings/",
    clean: true,
  },
  resolve: { extensions: [".ts", ".js"] },
  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "settings",
      filename: "remoteEntry.js",
      exposes: { "./bootstrap": "./src/bootstrap.ts" },
      shared: { lit: { singleton: true, requiredVersion: "^3.1.3" } },
    }),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
  ],
  devServer: {
    port: 3006,
    historyApiFallback: true,
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" },
  },
};
