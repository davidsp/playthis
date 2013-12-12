
var Playlist = Backbone.Model.extend({
	url: 'https://gdata.youtube.com/feeds/api/videos?q=surfing&v=2&alt=jsonc',
	defaults: {
		searchTerm: 'spring',
	},
	
	initialize: function(){
	},
	
});

module.exports = Playlist;
//load info