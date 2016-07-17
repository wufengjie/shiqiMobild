var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AutoPrefixer = require('autoprefixer');
var webpack = require('webpack');
var options = require('./project');
var pkg = require('./package.json');

var env = process.env.NODE_ENV
    , jshash = '.[hash:10]'
    , plugins = [
    ]
    , loaders = [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel" },
        { test: /\.(gif|jpg|png)$/, loader: 'url-loader?limit=2000&name=imgs/[name].[ext]'},
        { test: /\.(woff|svg|eot|ttf|otf)$/, loader: 'url-loader?limit=1000&name=fonts/[name].[ext]'}
    ];


if ( env != 'production' ){

    jshash  = '';
    plugins.push(new webpack.DefinePlugin({ __DEBUG: true }))
    loaders.push(
        { test: /\.css$/, loader: "style!css!postcss" },
        { test: /\.less$/, loader: "style!css!postcss!less" },
        { test: /\.scss$/, loader: "style!css!postcss!sass" },
        { test: /\.html$/, loader: "html" }
    );
}
else{
    loaders.push(
        { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss" , { publicPath:'../' }) },
        { test: /\.less$/, loader: ExtractTextPlugin.extract("style", "css!postcss!less",{ publicPath:'../' }) },
        { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!postcss!sass" , { publicPath:'../' }) },
        { test: /\.html$/, loader: "html!html-minify" }
    );

    plugins.push(new HtmlWebpackPlugin({
        filename: options.html.to,
        template: options.html.from,
        inject: true
    }));

    if ( options.css ){
        var ext = '.[contenthash:10].css';
        if ( pkg['project-type'] === 'umd' ){
            ext = '.css';
        }
        plugins.push(new ExtractTextPlugin(options.css + ext));
    }
}

var result = {
    entry: options.js.from,
    output: {
        path: options.output,
        filename: options.js.to + (pkg['project-type'] === 'umd' ? '' : jshash) + '.js'
    },
    module: { loaders: loaders },
    postcss: function(){
        return [AutoPrefixer({ browsers: ['last 20 versions'] })]
    },
    plugins: plugins
};

if ( pkg['project-type'] === 'umd' ){
    result.output.library = pkg['project-library'];
    result.output.libraryTarget = 'umd';
}

module.exports = result;
