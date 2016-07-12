var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AutoPrefixer = require('autoprefixer');
var options = require('./project');
var pkg = require('./package.json');

var env = process.env.NODE_ENV
    , jshash = '.[hash:10]'
    , plugins = []
    , loaders = [
        { test: /\.js$/, loader: "babel" }
    ];

if ( env != 'production' ){
    jshash  = '';
    plugins = [];
    loaders.push(
        { test: /\.css$/, loader: "style!css!postcss" },
        { test: /\.less$/, loader: "style!css!postcss!less" },
        { test: /\.scss$/, loader: "style!css!postcss!sass" },
        { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
        { test: /\.html$/, loader: "html" }
    );
}
else{
    loaders.push(
        { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss") },
        { test: /\.less$/, loader: ExtractTextPlugin.extract("style", "css!postcss!less") },
        { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!postcss!sass")  },
        { test: /\.html$/, loader: "html!html-minify" }
    );

    plugins.push(new ExtractTextPlugin('./index.css'));
}

var result = {
    entry: './src/miox-components/index.js',
    output: {
        path: './src/miox-components/build/',
        filename: 'index.js',
        library: 'MioxComponents',
        libraryTarget: 'umd'
    },
    module: {
        loaders: loaders
    },
    postcss: function(){
        return [AutoPrefixer({ browsers: ['last 20 versions'] })]
    },
    plugins: plugins
};

module.exports = result;
