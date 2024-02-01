const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require ('path');

module.exports = {
    mode: 'development',
    entry: './src/app.ts',
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: './'
        }
    },
    module: {
        rules: [
            {
                test: /.tsx?$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve (__dirname, 'dist'),
        publicPath: '/dist'
    },
    plugins: [new CleanWebpackPlugin ()]
}