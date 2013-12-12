var	mainRouter = require('routers/mainRouter');


module.exports = $(function() {

	var router = new mainRouter();
	Backbone.history.start({pushState: false});
});