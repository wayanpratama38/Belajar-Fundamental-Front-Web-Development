const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { output, plugins } = require("../club-finder-webpack/webpack.common");
const { dir } = require("console");


module.exports = {
    entry : path.join(__dirname,"/src/script/js/component.js"),
    output : {
        path : path.join(__dirname,"dist"),
        filename: "bundle.js"
    },
    module : {
        rules : [
            {
                test : /\.css$/,
                use : ["style-loader","css-loader"]
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            template : path.join(__dirname,"index.html"),
            filename : "index.html"
        }),

        new CopyWebpackPlugin({
            patterns : [
                {
                    from : path.join(__dirname,"src/public"),
                    to : path.join(__dirname,"dist")
                }
            ]
        })
    ]
}