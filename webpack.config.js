var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack')

module.exports = {
    entry: "./app/index.jsx",
    output: {
        path: __dirname + "/app/build/",
        filename: "index-bundle.js"
    },
    resolve: {
        extensions: ['', '.html', '.js', '.json', '.scss', '.css'],
        alias: {
            bootstrap_css: __dirname + "/app/node_modules/bootstrap/dist/css/bootstrap.min.css",
            leaflet_css: __dirname + "/app/node_modules/leaflet/dist/leaflet.css",
            leaflet_draw_css: __dirname + "/app/node_modules/leaflet-draw/dist/leaflet.draw.css"
        }
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },  
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['babel'],
            }, { 
                test: /\.(png|jpg)$/, loader: "file-loader?name=images/[name].[ext]"
            }, { 
                test: /\.html$/, loader: 'html-loader' 
            },
            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
        ]
    },
    plugins: [new HtmlWebpackPlugin({
      filename: 'index.html',
      template: __dirname + '/app/template.html'
    }), new webpack.ProvidePlugin({
           $: "jquery",
           jQuery: "jquery"
       })]
};