/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
require('dotenv').config({ path: '.env' });
const { modulesConfig, inactiveModulesConfig } = require('./plugins/moduleLoader');
// const nodeExternals = require('webpack-node-externals');
// const TerserPlugin = require('terser-webpack-plugin');
const PATH = require('path');
const PKG = require('./package');

const nuxtConfig = {
    css: modulesConfig.nuxt.css || [],
    styleResources: modulesConfig.nuxt.styleResources || {},
    plugins: modulesConfig.nuxt.plugins || [],
    chunks: modulesConfig.nuxt.chunks || [],
};
const IS_DEV = process.env.NODE_ENV !== 'production';
const BASE_URL = `${process.env.API_PROTOCOL}://${process.env.API_HOST}${process.env.API_PORT ? `:${process.env.API_PORT}` : ''}${process.env.API_PREFIX}`;

module.exports = {
    mode: 'universal',
    dev: IS_DEV,
    head: {
        htmlAttrs: {
            lang: 'en',
        },
        title: 'Ergonode',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'keywords', name: 'keywords', content: PKG.keywords.join(', ') },
            { hid: 'description', name: 'description', content: PKG.description },
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                sizes: '16x16',
                href: '/images/favicon-16x16.png',
            },
            {
                rel: 'icon',
                type: 'image/x-icon',
                sizes: '32x32',
                href: '/images/favicon-32x32.png',
            },
        ],
    },
    loading: { color: '#00BC87', height: '3px' },
    router: {
        middleware: ['modules'],
    },
    css: nuxtConfig.css,
    plugins: nuxtConfig.plugins,
    styleResources: nuxtConfig.styleResources,
    modules: [
        '@nuxtjs/router',
        '@nuxtjs/axios',
        'cookie-universal-nuxt',
        '@nuxtjs/style-resources',
        [
            '@nuxtjs/component-cache',
            {
                maxAge: 1000 * 60 * 60,
            },
        ],
    ],
    axios: {
        baseURL: BASE_URL || 'http://localhost:8000',
    },
    build: {
        parallel: true,
        // cache: true,
        // optimizeCSS: true,
        extend(config, { isDev, isClient }) {
            const alias = config.resolve.alias || {};
            const { aliases = {} } = modulesConfig.nuxt;
            const { aliases: inactiveAliases = {} } = inactiveModulesConfig.nuxt;

            alias['@Root'] = PATH.join(__dirname, './');
            alias['@Modules'] = PATH.join(__dirname, '/modules');
            alias['@NodeModules'] = PATH.join(__dirname, '/node_modules');
            Object.keys(aliases).map((key) => {
                alias[key] = PATH.join(__dirname, aliases[key]);
            });
            Object.keys(inactiveAliases).map((key) => {
                alias[key] = PATH.join(__dirname, inactiveAliases[key]);
            });

            if (isClient && isDev) {
                config.devtool = 'source-map';
            }
            // if (!isDev) {
            // config.target = 'node';
            // config.externals = [
            //     nodeExternals({
            //         // whitelist: [/@babel\/runtime/],
            //         modulesFromFile: {
            //             exclude: ['devDependencies'],
            //             include: ['dependencies'],
            //         },
            //     }),
            // ];
            // }
            // if (isDev) {
            //     config.mode = 'development';
            // } else {
            //     config.mode = 'production';
            // }
            // config.module.rules.push(
            //     {
            //         // test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            //         // test: /\.test\.(js|jsx|ts|tsx)$/,
            //         // exclude: [
            //         //     // PATH.resolve(__dirname, 'modules/@ergo/import'),
            //         //     /(.*)\/(__tests__|tests)\/(.*)/,
            //         // ],
            //         test: /\.js$/,
            //         loader: 'babel-loader',
            //         include: [],
            //         // exclude: [
            //         //     /(tests|__tests__)/,
            //         //     /modules\/@ergo\/attributes\/components\/Pages\/__tests__/,
            //         //     /(modules)\/(.*)(tests|__tests__)\/(.*)\//,
            //         //     PATH.resolve(__dirname, 'modules/@ergo/attributes/components/Pages/__tests__'),
            //         //     // /\.test\.(js|jsx|ts|tsx)$/,
            //         // ],
            //     },
            // );
            // config.entry = {
            //     vendor2: ['lodash', 'diff', 'nise'],
            //     // app: './entry',
            // };
        },
        optimization: {
            // minimize: true,
            // minimizer: [new TerserPlugin()],
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 0,
                cacheGroups: {
                    default: false,
                    commons: {
                        test: /node_modules[\\/](vue|vue-loader|vue-router|vuex|vue-meta|core-js|@babel\/runtime|axios|webpack|setimmediate|timers-browserify|process|regenerator-runtime|cookie|js-cookie|is-buffer|dotprop|nuxt\.js)[\\/]/,
                        chunks: 'all',
                        name: 'vueLib',
                        // reuseExistingChunk: true,
                        priority: 10,
                    },
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'all',
                        name: 'vendors',
                        enforce: true,
                    },
                    modules: {
                        test(module) {
                            return module.resource && module.resource.includes('modules/@ergo');
                        },
                        chunks: 'all',
                        name: 'modules',
                        enforce: true,
                        priority: -30,
                    },
                    coreComponentsModule: {
                        test(module) {
                            return module.resource && module.resource.includes('@ergo/core/component');
                        },
                        chunks: 'all',
                        name: 'coreComponentsModule',
                        priority: -10,
                        enforce: true,
                    },
                    styles: {
                        test: /\.css$/,
                        name: 'styles',
                        chunks: 'all',
                        enforce: true,
                    },
                    ...nuxtConfig.chunks,
                },
            },
        },
    },
    vue: {
        config: {
            performance: true,
        },
    },
    env: {
        baseURL: BASE_URL,
    },
};
