const path=require("path");
const webpack=require("webpack");
module.exports = {
    "entry": [
	"webpack-jquery-ui",
//	"babel-polyfill",
	"./battleships.js"
    ],
    //    "plugins": ["babel-preset-latest"],
    "plugins": [
	new webpack.ProvidePlugin({
	    $: "jquery",
	    jQuery: "jquery",
	    "window.jQuery": "jquery'",
	    "window.$": "jquery"
	})
    ],
    "output": {
        "filename": "bundle.js",
        path: path.join(__dirname,'build/assets/'),
        publicPath:'assets/'
    },
    "module": {
	"rules": [
	    {
		test: /\.(jpe?g|png|gif)$/i,
		loader:"file-loader",
		query:{
		    name:'[name].[ext]',
		    outputPath:'images/'
		    //the images will be emmited to public/assets/images/ folder 
		    //the images will be put in the DOM <style> tag as eg. background: url(assets/images/image.png); 
		}
	    },
	    {
		test: /\.css$/,
		loaders: ["style-loader","css-loader"]
	    },
	    {
		test: /\.(mp3)$/i,
		loader:"file-loader",
		query:{
		    name:'[name].[ext]',
		    outputPath:'fx/'
		}
	    },
	]/*,
	"loaders": [
	    {
		"loader": "babel-loader",
		"exclude": [
		    path.resolve(__dirname, "node_modules"),
		    path.resolve(__dirname, "server"),
		],
		
		// Only run `.js` and `.jsx` files through Babel
		"test": /\.jsx?$/,

		// Options to configure babel with
		"query": {
		    "plugins": ['transform-runtime']
		}
	    },
	]*/
    }
};
