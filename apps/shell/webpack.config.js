const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production" || process.env.NODE_ENV === "production";

  const subPathRemotes = {
    editorial: "editorial@editorial/remoteEntry.js",
    media: "media@media/remoteEntry.js",
    auth: "auth@auth/remoteEntry.js",
    collab: "collab@collab/remoteEntry.js",
    settings: "settings@settings/remoteEntry.js",
    analytics: "analytics@analytics/remoteEntry.js",
  };

  const devRemotes = {
    editorial: "editorial@http://localhost:3001/remoteEntry.js",
    media: "media@http://localhost:3002/remoteEntry.js",
    auth: "auth@http://localhost:3003/remoteEntry.js",
    collab: "collab@http://localhost:3004/remoteEntry.js",
    settings: "settings@http://localhost:3006/remoteEntry.js",
    analytics: "analytics@http://localhost:3005/remoteEntry.js",
  };

  const remotes = isProduction ? subPathRemotes : devRemotes;

  return {
    entry: "./src/index.ts",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[contenthash].js",
      publicPath: "./",
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
        remotes,
        shared: {
          "single-spa": { singleton: true, requiredVersion: "^5.9.4" },
          zustand: { singleton: true, requiredVersion: "^4.5.2" },
        },
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        favicon: "./src/assets/favicon.png",
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
};
