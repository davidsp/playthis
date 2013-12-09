var list = require('views/v-playlist');
var Utils = require('modules/utils');


var playListRouter = Backbone.Router.extend({

	routes: {
	    
	    "": "basicInit",
	     
		//takes the query and does a youtube search
		"list/:query": "loadList",

		//takes the id of the video and returns the json data of the video itself
		"video/:id": "showVideo",
		
		//display info about the app
		"about": "showAbout"
	},
	basicInit: function() {
		console.log('basic');
	},

	loadList: function(query){
		Utils.loadJson(query,'list');		
	},

	showVideo: function(id) {
		Utils.loadJson(query,'video');
	},

	showAbout: function(){
		console.log('we show about');
	}
});

app = new playListRouter();
module.exports = playListRouter;