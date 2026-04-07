const { ModuleFederationPlugin } = require("webpack").container;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: "./src/bootstrap.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "/auth/",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
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
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./bootstrap": "./src/bootstrap.ts",
      },
      shared: {
        "single-spa": { singleton: true, requiredVersion: "^5.9.4" },
        rxjs: { singleton: true, requiredVersion: "^7.8.1" },
        "zone.js": { singleton: true, requiredVersion: "~0.14.5" },
      },
    }),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
  ],
  devServer: {
    port: 3003,
    historyApiFallback: true,
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" },
  },
};
