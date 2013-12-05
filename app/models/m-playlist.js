var Playlist = Backbone.Model.extend({
	
	defaults: {
		searchTerm: 'spring',
		url: 'http://www.youtube.com'
	},
	
	initialize: function(){
		this.loadPlaylist();
	},
	
	loadPlaylist: function(){
		$.ajax({
			url: '/playdata/playlist.json',
			type: 'POST',
			dataType: 'xml/html/script/json/jsonp',
			// data: {param1: 'value1'},
			complete: function(xhr, textStatus) {
			},
			success: function(data, textStatus, xhr) {
				console.log(data);
			},
			error: function(xhr, textStatus, errorThrown) {
			}
		});
		
	}
});

module.exports = Playlist;
//load info