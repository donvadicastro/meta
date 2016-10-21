var webpack = require('webpack'),
    path = require('path');

module.exports = {
    //entry: './src/app.ts',
    output: {
        path: path.resolve("./dist"),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx', '']
    },
    module: {
        loaders: [{
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }
        ]
    },
    ts: {
        transpileOnly: true,
        compilerOptions: {
            target: 'ES5',
            sourceMap: true
        }
    },
    devtool: 'inline-source-map',

    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: null, // if no value is provided the sourcemap is inlined
            test: /\.(ts|js)($|\?)/i // process .js and .ts files only
        })
    ]
};