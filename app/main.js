var	mainRouter = require('models/m-video');

module.exports = $(function() {
	var playListRouter = new playListRouter();
	var playlistModel = require('models/m-playlist');
	var playlistView = require('views/v-playlist');

	var sminstance = new playlistModel();
	var svinstance = new playlistView({
		model: sminstance
	});

	//core here

});