var	mainRouter = require('routers/mainRouter');

module.exports = $(function() {

	var router = new mainRouter();
	Backbone.history.start({pushState: false})

	// var playlistModel = require('models/m-playlist');
	// var playlistView = require('views/v-playlist');

	// var sminstance = new playlistModel();
	// var svinstance = new playlistView({
	// 	model: sminstance
	// });

	//core here

});