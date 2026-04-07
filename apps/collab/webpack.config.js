const { ModuleFederationPlugin } = require("webpack").container;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "/collab/",
    clean: true,
  },
  resolve: { extensions: [".ts", ".js", ".svelte"] },
  module: {
    rules: [
      { test: /\.svelte$/, use: "svelte-loader" },
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "collab",
      filename: "remoteEntry.js",
      exposes: { "./bootstrap": "./src/bootstrap.ts" },
      shared: { svelte: { singleton: true, requiredVersion: "^4.2.15" } },
    }),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
  ],
  devServer: {
    port: 3004,
    historyApiFallback: true,
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" },
  },
};
