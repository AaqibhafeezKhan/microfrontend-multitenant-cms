const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

const remoteUrls = {
  editorial: process.env.EDITORIAL_REMOTE_URL || "http://localhost:3001/remoteEntry.js",
  media: process.env.MEDIA_REMOTE_URL || "http://localhost:3002/remoteEntry.js",
  auth: process.env.AUTH_REMOTE_URL || "http://localhost:3003/remoteEntry.js",
  collab: process.env.COLLAB_REMOTE_URL || "http://localhost:3004/remoteEntry.js",
  analytics: process.env.ANALYTICS_REMOTE_URL || "http://localhost:3005/remoteEntry.js",
  settings: process.env.SETTINGS_REMOTE_URL || "http://localhost:3006/remoteEntry.js",
};

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "auto",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
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
      name: "shell",
      remotes: {
        editorial: `editorial@${remoteUrls.editorial}`,
        media: `media@${remoteUrls.media}`,
        auth: `auth@${remoteUrls.auth}`,
        collab: `collab@${remoteUrls.collab}`,
        analytics: `analytics@${remoteUrls.analytics}`,
        settings: `settings@${remoteUrls.settings}`,
      },
      shared: {
        "single-spa": { singleton: true, requiredVersion: "^5.9.4" },
        zustand: { singleton: true, requiredVersion: "^4.5.2" },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: false,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
