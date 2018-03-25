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
const SAMPLE_DIR = path.join(__dirname, 'sample');

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
        ifDevelopment(path.join(SAMPLE_DIR, 'index.js'))
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
                include: [SRC_DIR, SAMPLE_DIR]
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
    externals: {
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

    // -------------
    // Webpack-Dev Server for Sample
    // -------------
    devServer: {
        hot: true,
        inline: true,
        port: 3000,
        contentBase: '/'
    }
};
