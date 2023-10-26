const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const PORT = 5000;

const app = express();
const config = require("./webpack/webpack.dev.js");
const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.use(
  webpackHotMiddleware(compiler, {
    path: "/__what",
    heartbeat: 10 * 1000,
  })
);

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}\n`);
});
