// NOTE need for cosmos
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const env = process.env.NODE_ENV || 'development'

const main = path.join(__dirname, "../../..")
const src = path.join(__dirname, 'src')
const lib = path.join(__dirname, 'lib')
const nodeModules = path.join(__dirname, '../../node_modules')
const envTest = path.join(main, '.env.test')

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(env)
    }
  }),

  new Dotenv({
    path: envTest,
    // '.env.test', // Path to .env file (this is the default)
    // safe: true // load .env.example (defaults to "false" which does not use dotenv-safe)
  })
]

if (env === 'production') {
  // NOTE Used when creating build
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: true,
      mangle: false,
      beautify: true
    })
  );
} else {
  // NOTE Used by Cosmos config (when loading Playground inside Playground)
  plugins.push(
    new HtmlWebpackPlugin({
      title: 'React Cosmos'
    })
  )
}

module.exports = {

  devtool: 'cheap-module-source-map',

  context: main,
  entry: src,

  output: {
    libraryTarget: 'umd',
    library: 'mountPlayground',
    path: lib,
    filename: 'index.js'
  },

  resolve: {
    modules: [main, "node_modules"],
    extensions: ['.tsx', '.ts', '.js', ".jsx"],
    alias: {
      // NOTE need for error Schema must be an instance of GraphQLSchema.
      react: path.resolve('./node_modules/react'),
      graphql: path.resolve('./node_modules/graphql'),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js/,
        include: src,
        use: 'babel-loader'
      },
      {
        test: /\.jsx?$/,
        include: src,
        use: 'babel-loader'
      },
      {
        test: /\.(css|less)$/,
        include: src,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff)$/,
        include: src,
        use: 'url-loader'
      }
    ]
  },

  plugins,
}
