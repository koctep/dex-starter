var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'sourcemap',
    entry: {},
    module: {
        preLoaders: [
          {test: /\.js$/, loader: "eslint-loader", exclude: [/app\/lib/, /node_modules/]}
        ],
        loaders: [
            { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!babel' },
            { test: /\.jade$/, loader: 'html!jade-html' },
            { test: /\.html$/, loader: 'html' },
            { test: /\.scss$/, loader: 'style!css!sass' },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
            { test: /\.(png|jpg)$/, loader: 'file?name=img/[name].[ext]'} // inline base64 URLs for <=10kb images, direct URLs for the rest
        ]
    },
    resolve: {
    },
    plugins: [
        // Injects bundles in your index.html instead of wiring all manually.
        // It also adds hash to all injected assets so we don't have problems
        // with cache purging during deployment.
        new HtmlWebpackPlugin({
            template: 'client/index.html',
            inject: 'body',
            hash: true
        }),
        // Automatically move all modules defined outside of application directory to vendor bundle.
        // If you are using more complicated project structure, consider to specify common chunks manually.
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module, count) {
                return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
            }
        })
    ]
};
