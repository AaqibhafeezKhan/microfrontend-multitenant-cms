const { ModuleFederationPlugin } = require("webpack").container;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "auto",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js", ".vue"],
    alias: { "@": path.resolve(__dirname, "src") },
  },
  module: {
    rules: [
      { test: /\.vue$/, use: "vue-loader" },
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: { appendTsSuffixTo: [/\.vue$/] },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: "media",
      filename: "remoteEntry.js",
      exposes: { "./bootstrap": "./src/bootstrap.ts" },
      shared: {
        vue: { singleton: true, requiredVersion: "^3.4.21" },
        "vue-router": { singleton: true, requiredVersion: "^4.3.2" },
        pinia: { singleton: true, requiredVersion: "^2.1.7" },
      },
    }),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
  ],
  devServer: {
    port: 3002,
    historyApiFallback: true,
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" },
  },
};
