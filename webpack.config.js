//NODE SCRIPT

const path = require('path');  //node function
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {

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
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map', //source map, shows errors exactly where they are in their source file. Makes debugging faster. Supported by all browsers
        devServer: {
            contentBase: path.join(__dirname, 'public')
        }
    }
}