const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require('webpack');

module.exports = {
  mode: "development",
  
  entry: {
    index: [
      "webpack-hot-middleware/client?path=/__what&timeout=2000&reload=true",
      path.resolve(__dirname, "..", "src", "index.jsx")
    ]
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              modules: {
                auto: true,
                localIdentName: "[name]__[local]___[hash:base64:5]",
                exportLocalsConvention: "camelCase",
              },
            }
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: "static/icons/[name][ext]",
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/fonts/[name][ext]",
        }
      },
    ]
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "..", "dist"),
    clean: true,
    publicPath: "/",
    assetModuleFilename: "static/images/[name][ext]",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "src", "index.html"),
      filename: "index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  resolve: {
    extensions: [".js", ".jsx"],
  }
};
