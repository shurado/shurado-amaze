const fs      = require('fs');
const path    = require('path')
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const svgConfigs = [
  { cleanupIDs: true },
  { removeTitle: true },
  { removeComments: true },
  { removeDesc: true },
  { removeDimensions: true },
  { removeUselessStrokeAndFill: true }
];

module.exports = {
  setVariable: (key, value) => {
    const env = {};
    env[key] = JSON.stringify(value);

    return {
      plugins: [new webpack.DefinePlugin(env)] 
    }
  },
  loadJavascript: (env) => ({
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader?cacheDirectory',
          options: {
            presets: env === 'development' ? ['react', 'es2015', 'react-hmre'] : ['react', 'es2015']
          },
          include: path.join(__dirname, 'client'),
          exclude: /node_modules/
        },        
      ]
    }
  }),
  devServer: (env) => ({
    output: {
      publicPath: 'http://localhost:5000' + '/bundle',
      filename: 'dev.js'
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      stats: 'errors-only',
      port: 5000,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      host: '127.0.0.1'
    },
    plugins: [new webpack.HotModuleReplacementPlugin({ mutiStep: true })]
  }),
  loadSvgIcons: (options) => ({
    module: {
      rules: [
        {
          test: /\.svg$/,
          include: path.resolve(__dirname, 'public', 'images', 'icons'),
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                name: 'icon-[name]'
              }  
            },
            {
              loader: 'svgo-loader',
              options: {
                plugins: svgConfigs
              }
            }
          ]
        }
      ]
    }
  }),
  loadStylesheet: (options) => ({
    module: {
      rules: [
        {
          test: /\.(sass|scss)$/,
          use: [
            'style-loader?sourceMap=true',
            'css-loader?sourceMap=true&modules&localIdentName=[name]-[local]__[hash:base64:5]',
            'postcss-loader?sourceMap=true',
            'sass-loader?sourceMap=true',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: path.resolve(__dirname, 'client', 'styles', 'resource.scss')
              }
            }
          ]
        }
      ]
    }
  }),
  extractStylesheet: (env) => ({
    module: {
      rules: [
        {
          test: /\.(sass|scss)$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader?sourceMap=true&localIdentName=[hash:base64:5]',
              'postcss-loader',
              'sass-loader',
              {
                loader: 'sass-resources-loader',
                options: {
                  resources: path.resolve(__dirname, 'client', 'styles', 'resource.scss')
                }
              }
            ]
          })
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader?sourceMap=true&localIdentName=[hash:base64:5]'
          })
        }
      ],
    },
    plugins: [
      new ExtractTextPlugin({
        filename: "bundle/bundle.scss",
        allChunks: true
      })
        
    ]
  })
}
