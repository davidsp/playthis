var playListRouter = Backbone.Router.extend({

	routes: {
		//takes the query and does a youtube search
		"list/:query": "showList",

		//takes the id of the video and returns the json data of the video itself
		"video/:id": "showVideo",
		
		//display info about the app
		"about": "showAbout"
	},
	showList: function(query){
		console.log("we show " + query);
	},

	showVideo: function(id) {
		console.log('we show ' + id);
	},

	showAbout: function(){
		console.log('we show about');
	}
});

module.exports. playListRouter;