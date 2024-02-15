const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
// const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
  mode: "production",

  entry: {
    index: path.resolve(__dirname, "..", "src", "index.jsx"),
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              modules: {
                auto: /\.module\.\w+$/i,
                localIdentName: "[hash:base64:8]",
                exportLocalsConvention: "camelCase",
              },
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
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
        },
      },
    ],
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "..", "dist"),
    clean: true,
    publicPath: "./",
    assetModuleFilename: "static/images/[name][ext]",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "src", "index.html"),
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new FaviconsWebpackPlugin({
      logo: "src/static/favicon/logo.png",
      mode: "webapp",
      devMode: "webapp",
      prefix: "static/favicon/",
      cache: true,
      // inject: htmlPlugin => path.basename(htmlPlugin.options.filename) === "index.html",
      favicons: {
        background: "#ddd",
        theme_color: "#333",
        appleStatusBarStyle: "default",
        icons: {
          android: ["android-chrome-192x192.png", "android-chrome-512x512.png"],
          appleIcon: ["apple-touch-icon.png"],
          appleStartup: false,
          favicons: ["favicon-16x16.png", "favicon-32x32.png", "favicon.ico"],
          windows: false,
          yandex: false,
        },
      },
    }),
    // new FileManagerPlugin({
    //   events: {
    //     onEnd: {
    //       copy: [
    //         {
    //           source: path.resolve(__dirname,"..", "src", "static", "yourDirName"),
    //           destination: path.resolve(__dirname, "..", "dist", "static"),
    //         },
    //       ],
    //     },
    //   },
    // }),
  ],

  resolve: {
    extensions: [".js", ".jsx"],
  },
};
