let path = require('path');
const webpack = require('webpack');
const resolve = require('path').resolve;

var basePath = __dirname;

module.exports = {
    context: path.join(basePath, 'js'),
    entry: {
        app: './index.tsx',
    },
    // entry: [
    //     __dirname + '/js/index.tsx',
    // ],
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }]
    },
    plugins: [
        // new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') })
    ],
    output: {
        filename: 'bundle.js',
        path: path.join(basePath, '../public'),
        publicPath: resolve('../public'),
        library: 'react-xterm',
        libraryTarget: 'umd'
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.png']
    },
};

// const resolve = require('path').resolve;
// const config = {
//     devtool: 'eval-source-map',
//     entry: __dirname + '/js/index.tsx',
//     output: {
//         path: resolve('../public'),
//         filename: 'bundle.js',
//         publicPath: resolve('../public')
//     },
//     resolve: {
//         extensions: ['.js', '.jsx', '.css']
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.jsx?$/,
//                 loader: 'babel-loader',
//                 exclude: /node_modules/
//             },
//             {
//                 test: /\.css$/,
//                 loader: 'style-loader!css-loader?modules'
//             }
//         ]
//     }
// };
//
// module.exports = config;
