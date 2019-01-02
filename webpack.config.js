//NODE SCRIPT

const path = require('path');  //node function

module.exports = {

    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js/,   //regular expression to grab any files that end in .js and run them through babel
            exclude: /node_modules/   //Don't run babel in this folder
        }, { //sets up webpack to work with css files
            test: /\.s?css$/,   //regexp that makes the s optional
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    devtool: 'cheap-module-eval-source-map', //source map, shows errors exactly where they are in their source file. Makes debugging faster. Supported by all browsers
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
}