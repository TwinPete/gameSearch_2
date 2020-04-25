const path = require('path');

module.exports = {
    entry: {
        'search': path.resolve(__dirname, './src/index.js'),
        'detail' : path.resolve(__dirname, './src/detail.js')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};