var webpack = require('webpack');
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const loaders = {
  css: {
    loader: 'css-loader'
  },
  postcss: {
    loader: 'postcss-loader',
    options: {
      plugins: (loader) => [
        autoprefixer({
          browsers: ['last 2 versions']
        })
      ]
    }
  },
  sass: {
    loader: 'sass-loader',
    options: {
      indentedSyntax: true,
      includePaths: [path.resolve(__dirname, './src')]
    }
  }
}


var config = {
  
    node: {
     fs: "empty"
  }

  context: __dirname, // `__dirname` is root of project and `src` is source
  
  entry: {
    app: './app.js'
  },
  
  output: {
    path: __dirname, // `dist` is the destination
    filename: 'bundle.js',
  },
  
  devServer: {
    contentBase: __dirname, // `__dirname` is root of the project
    inline: true,
    port:8080,
    hot:true
  },


  module: {
  	rules: [
  		{
  			test: /\.js$/, //check for all js files
  			exclude: /node_modules/,
  			use: [{
  				loader: 'babel-loader',
  				options: { presets: ['es2015'] }
  			}]
  		},
  		{test: /\.html$/, exclude: /tmp/, loader: 'ng-cache-loader!raw-loader'},
  		{test: /\.css$/, loader: "style-loader!css-loader"},
  		{test: /\.scss$/, loader: "style-loader!css-loader!sass-loader"},
      {test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery'},
  		{test: /\.hbs$/, loader: "handlebars-loader"},
      {test: /\.handlebars$/, loader: "handlebars-loader"},
      {test: /\.(png|jpg|woff|woff2|eot|ttf|otf|svg)$/, loader: 'url-loader?limit=100000' }

  	]
  },

  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),
    new ExtractTextPlugin('[name].css')
   //  new HtmlWebpackPlugin({
   //   title: 'Custom template using Handlebars',
   //   template: 'main.handlebars'
   // })
  ],
  resolve: {
    extensions: ['.hbs', '.js', '.sass', '.handlebars'],
    modules: [path.join(__dirname), 'node_modules']
    // alias: {
    //    handlebars: 'handlebars/dist/handlebars.min.js'
    //  }
  },

  devtool: "eval-source-map" //default developement sourcemap
};

//check if build is running in production mode, then change the sourcemap type
if(process.env.NODE_ENV === "production"){
	config.devtool = ""; //no sourcemap for production

	//add more configuration for production here like
	//uglify plugin
	//offline plugin
	//etc.
}

module.exports = config;