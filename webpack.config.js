'use strict';
/**
 * @author Greg Rozmarynowycz <greg@thunderlab.net>
 */
const path = require('path');

module.exports = {
    devtool: "inline-source-map",
    entry: './src/index.ts',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader : "ts-loader",
                // use : [{
                //
                //     options: {
                //         configFile: '../tsconfig.json'
                //     }
                // }],
            }
        ]
    }
};
