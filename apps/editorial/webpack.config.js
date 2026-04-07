const { ModuleFederationPlugin } = require("webpack").container;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
      name: "editorial",
      filename: "remoteEntry.js",
      exposes: {
        "./bootstrap": "./src/bootstrap.tsx",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.3.1", eager: false },
        "react-dom": { singleton: true, requiredVersion: "^18.3.1", eager: false },
        "react-router-dom": { singleton: true, requiredVersion: "^6.23.0" },
        zustand: { singleton: true, requiredVersion: "^4.5.2" },
        "single-spa-react": { singleton: true },
      },
    }),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
  ],
  devServer: {
    port: 3001,
    historyApiFallback: true,
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" },
  },
};
