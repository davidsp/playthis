var	Utils = require('modules/utils.js');

var Playlist = Backbone.Model.extend({
	
	defaults: {
		searchTerm: 'spring',
		url: 'http://www.youtube.com'
	},
	
	initialize: function(){
//		var data = Utils.loadJson();
		console.log(data);
	},
	
});

module.exports = Playlist;
//load info