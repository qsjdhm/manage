/**
 * Created by will on 2015/8/14.
 */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    contentBase: __dirname,
    hot: true,
    quiet: false,
    noInfo: false,
    stats: { colors: true }
}).listen(3001, '127.0.0.1', function (err, result) {
    if (err) console.log(err);
    console.log('正在监听host.com:3001');
});