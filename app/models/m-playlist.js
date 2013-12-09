
var Playlist = Backbone.Model.extend({
	
	defaults: {
		searchTerm: 'spring',
		url: 'https://gdata.youtube.com/feeds/api/videos?q=surfing&v=2&alt=jsonc'
	},
	
	initialize: function(){
		//populateUrl();
//		var data = Utils.loadJson();
	},
	
});

module.exports = Playlist;
//load info