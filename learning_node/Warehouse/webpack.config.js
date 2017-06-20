var webpack = require('webpack');
var commonsPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});


module.exports = {
    cache: true,
    entry: {
        main:  './views/javascripts/index.js',
    },
    output: {
        path: 'public/javascripts/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {test: /\.jsx$/, loader: 'babel', exclude: /(node_modules|bower_components)/, query: { presets: [ 'es2015'] }},
            {test: /\.js$/, loader: 'babel', exclude: /(node_modules|bower_components)/, query: { presets: [ 'es2015'] }},
        ]
    },
    plugins: [
        definePlugin,
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin('common.js')
    ]

};
