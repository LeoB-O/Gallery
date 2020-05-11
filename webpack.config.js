const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[hash].js",
  },
  devServer: {
    contentBase: path.join(__dirname, "./dist"),
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["latest", "react"],
          plugins: ["transform-runtime"],
        },
        include: [path.resolve(__dirname, "./src")],
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
      {
        test: /\.css$/,
        loader: "postcss-loader",
        options: {
          plugins: function (loader) {
            return [
              require("autoprefixer")({
                browsers: ["last 5  versions"],
              }),
            ];
          },
        },
      },
      {
        test: /\.(woff|svg|ttf|eot)$/i,
        loader: "url-loader",
        options: {
          /*图片名称*/
          name: "fonts/[name].[ext]",
          /*位置*/
        },
      },
      //引入 imgs 下的图片
      {
        test: /\.(png|jpg|gif|mp4)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      fuck: JSON.stringify(process.env.NODE_ENV),
    }),
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin(),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          // 项目基本框架等
          chunks: "all",
          test: /(react|react-dom|react-dom-router|babel-polyfill|mobx)/,
          priority: 100,
          name: "vendors",
        },
        "async-commons": {
          // antd
          chunks: "all",
          test: /(antd)/,
          name: "antd",
          priority: 90,
        },
        commons: {
          // 其他同步加载公共包
          chunks: "all",
          name: "commons",
          priority: 80,
        },
      },
    },
  },
};
