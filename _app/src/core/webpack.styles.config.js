require('babel-polyfill');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const os = require('os');
const entries = require('../../configs/styleEntries');
const transpiling = require('../../configs/transpiling');

const moduleExclude = new RegExp(
    `node_modules/(?!(${transpiling.join('|')})/).*`
);

module.exports = env => {
    /**
     * Plugin setting
     */
    const plugins = [
        new webpack.ProgressPlugin(),
        new ExtractTextPlugin('../css/core.bundle.css'),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                warnings: false,
                ie8: false,
            },
            parallel: os.cpus().length,
            cache: true,
        }),
    ];

    return {
        entry: entries,
        output: {
            filename: '.base_styles',
            path: path.resolve('../assets/dist/js/'),
            publicPath: '/assets/dist/js/',
        },
        resolve: {
            extensions: ['.js'],
        },
        module: {
            loaders: [
                {
                    test: /\.scss$|\.css$/,
                    loader: ExtractTextPlugin.extract('css-loader!sass-loader'),
                },
                {
                    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                    loader:
                        'url-loader?limit=10000&mimetype=application/font-woff',
                },
                {
                    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                    loader:
                        'url-loader?limit=10000&mimetype=application/font-woff',
                },
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    loader:
                        'url-loader?limit=10000&mimetype=application/octet-stream',
                },
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'file-loader',
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
                },
            ],
        },
        plugins,
        node: {
            fs: 'empty',
            child_process: 'empty',
        },
    };
};
