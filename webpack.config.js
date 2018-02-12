// const path = require('path');

// console.log(111)

// module.exports = {
//   entry: './src/index.ts',
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: 'ts-loader',
//         exclude: /node_modules/
//       }
//     ]
//   },
//   resolve: {
//     extensions: [ '.tsx', '.ts', '.js' ]
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist')
//   }
// };



const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const src = path.join(__dirname, 'src');
const lib = path.join(__dirname, 'lib');
const nodeModules = path.join(__dirname, '../../node_modules');

const env = process.env.NODE_ENV || 'development';
const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(env)
    }
  })
];

if (env === 'production') {
  // Used when creating build
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: true,
      mangle: false,
      beautify: true
    })
  );
} else {
  // Used by Cosmos config (when loading Playground inside Playground)
  plugins.push(
    new HtmlWebpackPlugin({
      title: 'React Cosmos'
    })
  );
}

module.exports = {

  // Besides other advantages, cheap-module-source-map is compatible with
  // React.componentDidCatch https://github.com/facebook/react/issues/10441
  devtool: 'cheap-module-source-map',
  entry: src,
  output: {
    libraryTarget: 'umd',
    library: 'mountPlayground',
    path: lib,
    filename: 'index.js'
  },
  resolve: {
   // alias:{
   //    root: path.resolve(__dirname)
   //  },
    extensions: [ '.tsx', '.ts', '.js', ".jsx" ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
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
        include: nodeModules,
        use: ['style-loader', 'css-loader']
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
  plugins
};
