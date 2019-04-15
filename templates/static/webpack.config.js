const webpack = require('webpack');
const resolve = require('path').resolve;

module.exports = {
    entry: [
        __dirname + '/js/index.tsx',
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.css']
    },
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
        path: resolve('../public'),
        publicPath: resolve('../public'),
        library: 'react-xterm',
        libraryTarget: 'umd'
    }
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
