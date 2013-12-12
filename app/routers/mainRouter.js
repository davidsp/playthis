var Utils = require('modules/utils');
var BasicView = require('views/basic_view');

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
		new BasicView({});
	},

	loadList: function(query){
		new BasicView({});
		Utils.loadJson(query,'list');		
	},

	showVideo: function(id) {
		new BasicView({});
		Utils.loadJson(id,'video');
	},

	showAbout: function(){
		new BasicView({});
		console.log('we show about');
	}
});

app = new playListRouter();
module.exports = playListRouter;