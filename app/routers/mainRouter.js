var Utils = require('modules/utils');
var BasicView = require('views/basic-view');

var playListRouter = Backbone.Router.extend({

	routes: {
	    "": "basicInit",
	     
		//takes the query and does a youtube search
		"list/:query/:page": "loadList",

		//takes the id of the video and returns the json data of the video itself
		"video/:id": "showVideo",
		
		//display info about the app
		"about": "showAbout"
	},
	
	basicInit: function() {
		new BasicView({});
	},

	loadList: function(query, page){
		new BasicView({});
		Utils.loadJson(query,'list',page);		
	},

	showVideo: function(id) {
		new BasicView({});
		Utils.loadVideo(id,'video');
	},

	showAbout: function(){
		new BasicView({});
	}
});

app = new playListRouter();
module.exports = playListRouter;