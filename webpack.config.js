'use strict';

/*eslint-env node */

// --------------
// Imports
// --------------
const webpack = require('webpack');
const path = require('path');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');

//---------------
// Directories
// --------------
const DIST_DIR = path.join(__dirname, 'dist');
const SRC_DIR = path.join(__dirname, 'src');
const SANDBOX_DIR = path.join(__dirname, 'sandbox');

// ------------
// The library used for the umd build.
// extracted from package.json
// -----------
const libName = require('./package.json').name;

// ------------
// To seperate the development and production build
// ------------
const { ifProduction, ifDevelopment } = getIfUtils(process.env.NODE_ENV);

module.exports = {
    // -------------
    // Mode
    // -------------
    mode: ifProduction('production', 'development'),

    // ------------
    // Entry
    // ------------
    entry: removeEmpty([
        ifProduction(path.join(SRC_DIR, 'index.js')),
        ifDevelopment(path.join(SANDBOX_DIR, 'index.js'))
    ]),

    // -------------
    // Output
    // -------------
    output: {
        path: DIST_DIR,
        filename: 'index.js',
        libraryTarget: 'umd',
        library: libName
    },

    // --------------
    // Resolve
    // --------------
    resolve: {
        alias: {
            src: SRC_DIR
        }
    },

    // --------------
    // Modules
    // --------------
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
                include: [SRC_DIR, SANDBOX_DIR]
            },
            {
                test: /\.scss$/,
                loader:
                    'style-loader!css-loader?modules=true&localIdentName=[name]_[local]_[base64:5]!resolve-url-loader!sass-loader',
                exclude: /node_modules/,
                include: [SRC_DIR, SANDBOX_DIR]
            }
        ]
    },

    // --------------
    // Plugins
    // -------------
    plugins: removeEmpty([
        ifDevelopment(
            new HtmlWebpackPlugin({
                inject: false,
                template: HtmlWebpackTemplate,
                appMountId: 'app',
                mobile: true,
                title: 'React-Create-Comp - Create your standalone react components.'
            })
        ),

        ifDevelopment(new webpack.HotModuleReplacementPlugin())
    ]),

    // -------------
    // Externals - To make sure that we don't bundle React and ReactDOM in our final package.
    // -------------
    externals: ifProduction(
        {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react',
                umd: 'react'
            },
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom',
                umd: 'react-dom'
            }
        },
        {}
    ),

    // -------------
    // Webpack-Dev Server for sandbox
    // -------------
    devServer: {
        hot: true,
        inline: true,
        port: 3000,
        contentBase: '/'
    }
};
